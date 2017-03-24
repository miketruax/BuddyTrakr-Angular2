
import User from '../models/user.model.js';

let ObjectId = require('mongoose').Types.ObjectId;

export default (app, router, passport, auth, admin) => {

// returns either valid user ID or 'Not Logged in' depending on user sesssion
  router.get('/auth/getUser', (req, res) => {
    res.send(req.isAuthenticated() ? req.user : {});
  });
  router.get('/auth/isLoggedIn', (req, res) => {
    res.send(req.isAuthenticated());
  });
  //log in route
  router.post('/auth/login', (req, res, next) => {

    //utilizes 'local-login' authentication
    passport.authenticate('local-login', (err, user, info) => {

      //in case of error, passes error to next middleware
      if (err) {
        console.log(err);
        return next(err);
      }
      //if no error with search, but no user by that name found
      if (!user) {
        res.status(401);
        // Return the info message
        return next(info.loginMessage);
      }

      //otherwise login using santized user (stripped of pswd hash and email hash)
      req.login(user.sanitize(), (err) => {
        if (err){
          console.log('ERR LOGIN:', err);
          return next(err);
        }

        //if no error
        res.status(200);

        // Return the user object
        res.send(req.user);
      });

    }) (req, res, next);
  });

  router.post('/auth/signup', (req, res, next) => {
    //utilizes local-signup information to ensure proper info
    passport.authenticate('local-signup', (err, user, info) => {

      if (err)
        return next(err);

      // If no user is returned...
      if (!user) {
        res.status(401);
        return next(info.signupMessage);
      }

      //if no errors, send response and move on.
      res.sendStatus(204);

    }) (req, res, next);
  });

  //log out route
  router.post('/auth/logout', (req, res) => {
    req.logOut();
    res.send({})
  });

  //will send full user object (sanitized) for access
  router.get('/auth/user', auth, (req, res) => {
    res.json(req.user);
  });

  //admin route to delete a user
  router.delete('/auth/delete/:uid', admin, (req, res) => {

    User.remove({
      // Model.find `$or` Mongoose condition
      $or : [

        { 'local.username' : req.params.uid },

        { 'local.email' : req.params.uid },

        { '_id' : ObjectId(req.params.uid) }
      ]
    }, (err) => {

      // If there are any errors, return them
      if (err)
        return next(err);

      // HTTP Status code `204 No Content`
    });
  });
};
