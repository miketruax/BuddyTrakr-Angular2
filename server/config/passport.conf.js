// Load PassportJS strategies
import {query} from '../config/pg.conf'
import LocalStrategy from "passport-local";
import User from "../models/user.model.js";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt-nodejs";
let crypto = require("crypto");
import jwt from "jsonwebtoken";

export default passport => {
  // Define length boundaries for expected parameters
  let bounds = {
    username: {
      min: 3,
      max: 16
    },
    password: {
      min: 8,
      max: 128
    },
    email: {
      min: 5,
      max: 128
    }
  };

  // Function to check a string against a REGEX for email validity
  let validateEmail = email => {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  };

  let checkLength = (string, comparison) => {
    return !(string.length > comparison.max || string.length < comparison.min);
  };

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },

      (req, username, password, done) => {
        //ensures name length requirements are met
        if (
          !checkLength(username, bounds.username)
        ) {
          return done(null, false, {
            signupMessage: "Invalid username length."
          });
        }

        //verifies pswd is long enough
        if (
          !checkLength(password,bounds.password)
        ) {
          return done(null, false, {
            signupMessage: "Invalid password length."
          });
        }

        //checks email length
        if (
          !checkLength(req.body.email, bounds.email)
        ) {
          return done(null, false, { signupMessage: "Invalid email length." });
        }

        //TODO: validation e-mail sent to person signing up with validated field
        if (!validateEmail(req.body.email)) {
          return done(null, false, { signupMessage: "Invalid email address." });
        }

        // User.findOne will not fire unless data is sent back
        process.nextTick(() => {
          //finds user with the person's email/username
          query("SELECT * FROM USERS WHERE USERS.email = $1 OR USERS.username = $2", [username, req.body.email], (err, result)=>{
            if(err) {
              return done(err);
            }
            if(result[0]){
              //if a user does exist with either credential, send error
              return done(null, false, {
                signupMessage: "That username/email is already taken."
              });
            } else {
              let hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
              query("INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3)", 
              [username.toLowerCase(), req.body.email.toLowerCase(), hashPassword], (err, result)=>{
                console.log(result);
                return done(null, result[0])
              })
            }
          })
            
                //if no errors to this point
        });
      }
    )
  );

  //local-login scheme

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        // By default, local strategy uses username and password
        usernameField: "username",
        passwordField: "password"},
      (username, password, done) => {
        query("SELECT username, id FROM USERS WHERE USERS.username = $1 OR USERS.email = $2", [username.toLowerCase, username.toLowerCase()], 
        (err, user)=>{
          if (err) return done(err);
          if(!user[0]){
            //compares password to non-hash if no user found to help prevent timing attack
            let randomHash = bcrypt.hashSync(
              `${password}hash`,
              bcrypt.genSaltSync(8),
              null
            );
            bcrypt.compareSync(password, randomHash);
            return done(null, false, {
              message: "Invalid username or password."
            });
          }
          if(!bcrypt.compareSync(password, user[0].password)){
            return done(null, false, {
              message: "Invalid username or password."
            });
          }
          let hash = crypto.randomBytes(20).toString("hex");
          let token = jwt.sign(
            { user: user[0], hash: hash },
            process.env.SESSION_SECRET,
            { expiresIn: 259200 }
          );
          query("UPDATE USERS SET jwthash = $1 WHERE id =  $2", [hash, user[0].id], (err, result)=>{
            if (err) {
              done(err);
            } else {
              done(null, user, { token: token });
            }
          })
        })
      })
    );

  //JWT Authentication
  let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.SESSION_SECRET
  };

  passport.use( "jwt-auth", new Strategy(jwtOptions, function(jwt_payload, done) {
    query("SELECT * FROM USERS where users.id = $1", [jwt_payload.user.id], (err, result)=>{
      if (err) {
        return done(err, false);
      }
      let timeDiff = (Date.now() - user[0].updatedAt.getTime()) / 36e5;
      if (jwt_payload.hash === user[0].jwthash && timeDiff <= 48) {
        return done(null, user[0]);
      } else {
        return done(null, false);
      }
    })
    })
  );
};
