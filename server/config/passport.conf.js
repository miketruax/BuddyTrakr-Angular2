// Load PassportJS strategies
import {query} from '../config/pg.conf'
import LocalStrategy from "passport-local";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import bcrypt from "bcrypt";
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
          query("SELECT * FROM USERS WHERE USERS.email = $1 OR USERS.username = $2", [username, req.body.email], async (err, result)=>{
            if(err) {
              return done(err);
            }
            if(result.rows[0]){
              //if a user does exist with either credential, send error
              return done(null, false, {
                signupMessage: "That username/email is already taken."
              });
            } else {
              let hashPassword = await bcrypt.hash(password, 8);
              query("INSERT INTO USERS (username, email, password) VALUES ($1, $2, $3)", 
              [username.toLowerCase(), req.body.email.toLowerCase(), hashPassword], (err, result)=>{
                return done(null, result.rows[0])
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
        let validPass;
        query("SELECT * FROM USERS WHERE USERS.username = $1 OR USERS.email = $2", [username.toLowerCase(), username.toLowerCase()], 
        async (err, userResult)=>{
          let user = userResult.rows[0];
          if (err) return done(err);
          if(!user){
            //compares password to non-hash if no user found to help prevent timing attack
            let randomHash = await bcrypt.hash(
              `${password}hash`,
              bcrypt.genSaltSync(8)
            );
            validPass = await bcrypt.compare(password, randomHash);
            return done(null, validPass, {
              message: "Invalid username or password."
            });
          }
          validPass = await bcrypt.compare(password, user.password)
          if(!validPass){
            return done(null, false, {
              message: "Invalid username or password."
            });
          }
          let hash = crypto.randomBytes(20).toString("hex");
          let token = jwt.sign(
            { user: user, hash: hash },
            process.env.SESSION_SECRET,
            { expiresIn: 259200 }
          );
          query("UPDATE USERS SET jwthash = $1, updatedat = now()  WHERE id = $2", [hash,  user.id], (err, result)=>{
            if (err) {
              done(err);
            } else {
              done(null, {id: user.id, hash: user.hash, username: user.username, email: user.email}, { token: token });
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
    query("SELECT jwthash, username, email, id, updatedat FROM USERS where users.id = $1", [jwt_payload.user.id], (err, result)=>{
      let user = result.rows[0];
      if (err) {
        return done(err, false);
      }
      let timeDiff = (Date.now() - new Date(user.updatedat)) / 36e5;
      if (jwt_payload.hash === user.jwthash && timeDiff <= 48) {
        
        return done(null, user);
      } else {
        
        return done(null, false);
      }
    })
    })
  );
};
