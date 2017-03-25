
// Load PassportJS strategies
import LocalStrategy from 'passport-local';

import User from '../app/models/user.model.js';

export default (passport) => {

  // Define length boundariess for expected parameters
  let bounds = {

    username : {

      minLength : 3,

      maxLength : 16
    },

    password : {

      minLength : 8,

      maxLength : 128
    },

    email : {

      minLength : 5,

      maxLength : 256
    }
  };

  // Function to check a string against a REGEX for email validity
  let validateEmail = (email) => {

      let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

      return re.test(email);
  };

  let checkLength = (string, min, max) => {

    if(string.length > max || string.length < min)
      return false;

    else
      return true;
  };

  // ## Serialize User
  passport.serializeUser((user, done) => {

    let sessionUser = {

      _id : user._id,

      username : user.username,

      friends : user.friends,

      role : user.role
    };

    done(null, sessionUser);
  });

  // ## Deserialize User
  passport.deserializeUser((sessionUser, done) => {

    done(null, sessionUser);
  });


  passport.use('local-signup', new LocalStrategy({

    usernameField : 'username',

    passwordField : 'password',

    passReqToCallback : true
  },

  (req, username, password, done) => {

    //ensures name length requirements are met
    if(!checkLength(username, bounds.username.minLength, bounds.username.maxLength)) {

      // ### Verify Callback

      // Invoke `done` with `false` to indicate authentication
      // failure
      return done(null, false, { signupMessage : 'Invalid username length.' });
    }

    //verifies pswd is long enough
    if(!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {
      return done(null, false, { signupMessage : 'Invalid password length.' });
    }

    //checks e-mail length
    if(!checkLength(req.body.email, bounds.email.minLength, bounds.email.maxLength)) {
      return done(null, false, { signupMessage : 'Invalid email length.' });
    }

    //simple regex for e-mail validation
    //TODO: validation e-mail sent to person signing up with validated field
    if(!validateEmail(req.body.email)) {

      return done(null, false, { signupMessage : 'Invalid email address.' });
    }

    // Asynchronous
    // User.findOne will not fire unless data is sent back
    process.nextTick(() => {
      //finds user with the person signing up's email/username
      User.findOne({$or : [
          { 'local.username' : username },
          { 'local.email' : req.body.email }
        ]
      }, (err, user) => {

        // If there are any errors, return the error
        if (err)
          return done(err);

        if(user) {

          //if a user does exist with either credential, send error
          return done(null, false, { signupMessage : 'That username/email is already taken.' });
        } else {
          //if no errors to this point
          let newUser = new User();

          newUser.local.username = username.toLowerCase();
          newUser.local.email = req.body.email.toLowerCase();
          newUser.local.password = password
          newUser.save((err) => {
            if (err)
              throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));

  //local-login scheme

  passport.use('local-login', new LocalStrategy({

    // By default, local strategy uses username and password
    usernameField : 'username',
    passwordField : 'password',

    // Allow the entire request to be passed back to the callback
    passReqToCallback : true
  },

  (req, username, password, done) => {

    if(!checkLength(username, bounds.username.minLength, bounds.email.maxLength)) {
      // ### Verify Callback
      return done(null, false, { loginMessage : 'Invalid username/email length.' });
    }

    // If the length of the password string is too long/short,
    // invoke verify callback
    if(!checkLength(password, bounds.password.minLength, bounds.password.maxLength)) {
      return done(null,false,{ loginMessage : 'Invalid password length.' });
    }
    //finds user with given criteria (uses toLowerCase for case sensitiviy issues)
    User.findOne({ $or : [
        { 'local.username' : username.toLowerCase() },
        { 'local.email' : username.toLowerCase() } ]
    }, (err, user) => {
      //sends errors back if err
      if (err)
        return done(err);

      //sends error back if no user found (most likely due to incorrect username spelling)
      if (!user) {return done(null, false, { loginMessage : 'Invalid username or password.' });
      }

      //next is to validate the password is correct
      if (!user.validPassword(password)) {
        return done(null, false, { loginMessage : 'Invalid username or password.' });
      }

      //if all validations passed, YOU DID IT!
      return done(null, user);
    });
  }));
};
