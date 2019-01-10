import User from "../models/user.model.js";
import passport from 'passport';
var express = require('express');
var router = express.Router();
  
  //Workaround for 100% uptime on heroku
  router.get("/ping", (req, res, next) => {
    res.send({ success: true });
  });

  // returns either valid user ID or 'Not Logged in' depending on user session


  //log in route
  router.post("/login", (req, res, next) => {
    passport.authenticate("local-login", (err, user, info) => {
        if (!user) {
          return res.send({err: info.message });
        }
        return res.send({ user: user.sanitize(), token: info.token });
      })(req,res,next);
  });

  router.post("/signup", (req, res, next) => {
    //utilizes local-signup information to ensure proper info
    passport.authenticate("local-signup", (err, user, info) => {
      let response = {};
      //if error, add error message and move on
      if (err) {
        return res.status(500).send({err: err})
      }
      //if no errors, send response and move on.
      res.send(response);
    })(req, res, next);
  });


  router.get("/logout", passport.authenticate("jwt-auth", { session: false }),
    (req, res, next) => {
      User.findOne(
        User.findOne({ _id: req.user._id }, (err, user) => {
          user.hash = crypto.randomBytes(20).toString("hex");
          user.save(err => {
            res.send({ success: true });
          });
        })
      );
    }
  );

  export default router;
