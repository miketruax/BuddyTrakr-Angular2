
import User from '../models/user.model.js';

let ObjectId = require('mongoose').Types.ObjectId;

export default (app, router, passport, auth, admin) => {


  router.get('/ping', (req,res)=>{
    res.send({success: true})
  });

// returns either valid user ID or 'Not Logged in' depending on user session
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
      let response =  {};
      if (err) {
         response.err = err
      }
      //if no error with search, but no user by that name found
      else if (!user) {
        // Return the info message
        response.err = info.loginMessage;
      }

      else {
        //otherwise login using sanitized user (stripped of pswd hash and email hash)
        req.login(user.sanitize(), (err) => {
          if (err) {
            response.err = err;
          }
          // Return the user object
          response.user = req.user;
        });
      }
      res.send(response);
    }) (req, res, next);

  });

  router.post('/auth/signup', (req, res, next) => {

    //utilizes local-signup information to ensure proper info
    passport.authenticate('local-signup', (err, user, info) => {
      let response = {};
      //if error, add error message and move on
      if (err) {
        response.err = err;
      }

      // If no user is returned...
      else if (!user) {
        response.err = info.signupMessage;
      }
      //if no errors, send response and move on.
      res.send(response);

    }) (req, res, next);
  });

  router.post('/auth/changeSettings', (req, res, next) => {
    User.findOne({'_id': req.user._id}, (err, user)=>{
      if(err){
        res.send({err: 'Something went wrong, please try again later.'});
      }
      else if(!user.validPassword(req.body.currentPassword)){
        res.send({err: 'Your current password was incorrect, please try again.'})
      }
      else{
        user.local.password = req.body.newPassword;
        user.save((err)=>{
          if(err){
            res.send({err: 'The server encountered an error, please try again later.'})
          }
          else{
            res.send({});
          }
        });
      }
    });



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
