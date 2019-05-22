import {query} from '../config/pg.conf';
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
      if(err){return res.status(401).send("Something went wrong, please try again later")}
      if(!user) {return res.status(401).send(info.message)}
      return res.send({ user: user, token: info.token });
      })(req,res,next);
  });

  router.post("/signup", (req, res, next) => {
    //utilizes local-signup information to ensure proper info
    passport.authenticate("local-signup", (err) => {
      //if error, add error message and move on
      if (err) {
        return res.status(500).send(err)
      }
      //if no errors, send response and move on.
      res.send({});
    })(req, res, next);
  });


  router.get("/logout", passport.authenticate("jwt-auth", { session: false }),
    (req, res, next) => {
      let hash = crypto.randomBytes(20).toString("hex");
      query('UPDATE users set hash = $1 WHERE id = $2', [hash, req.user._id], (err, result)=>{
        res.send({ success: true });
      })

    })

  export default router;
