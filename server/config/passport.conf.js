// Load PassportJS strategies
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
          User.findOne(
            {
              $or: [
                { "local.username": username },
                { "local.email": req.body.email }
              ]
            },
            (err, user) => {
              // If there are any errors, return the error
              if (err) {
                return done(err);
              }

              if (user) {
                //if a user does exist with either credential, send error
                return done(null, false, {
                  signupMessage: "That username/email is already taken."
                });
              } else {
                //if no errors to this point
                let newUser = new User();
                newUser.local.username = username.toLowerCase();
                newUser.local.email = req.body.email.toLowerCase();
                newUser.local.password = password;
                newUser.save(err => {
                  if (err) {
                    throw err;
                  }
                  return done(null, newUser);
                });
              }
            }
          );
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
        if (
          !checkLength(
            username,
            bounds.username
          )
        ) {
          // ### Verify Callback
          return done(null, false, {
            message: "Invalid username/email length."
          });
        }

        // If the length of the password string is too long/short,
        // invoke verify callback
        if (
          !checkLength(
            password,
            bounds.password
          )
        ) {
          return done(null, false, { message: "Invalid password length." });
        }
        //finds user with given criteria (uses toLowerCase for case sensitivity issues)
        User.findOne(
          {
            $or: [
              { "local.username": username.toLowerCase() },
              { "local.email": username.toLowerCase() }
            ]
          },
          (err, user) => {
            //sends errors back if err
            if (err) return done(err);

            //sends error back if no user found (most likely due to incorrect username spelling)
            if (!user) {
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

            //next is to validate the password is correct
            if (!user.validPassword(password)) {
              return done(null, false, {
                message: "Invalid username or password."
              });
            }
            //if all validations passed, YOU DID IT!
            let hash = crypto.randomBytes(20).toString("hex");
            //otherwise login using sanitized user (stripped of pswd hash and email hash)
            user.jwthash = hash;
            let token = jwt.sign(
              { user: user.sanitize(), hash: hash },
              process.env.SESSION_SECRET,
              { expiresIn: 259200 }
            );
            user.save(err => {
              if (err) {
                done(err);
              } else {
                done(null, user, { token: token });
              }
            });
          }
        );
      }
    )
  );

  //JWT Authentication
  let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.SESSION_SECRET
  };

  passport.use( "jwt-auth", new Strategy(jwtOptions, function(jwt_payload, done) {
    User.findOne({ _id: jwt_payload.user._id }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        //gets how long since last user update. Extra cushion in case of jwt cracking and user's jwtHash wasn't reset
        let timeDiff = (Date.now() - user.updatedAt.getTime()) / 36e5;
        if (jwt_payload.hash === user.jwthash && timeDiff <= 48) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
