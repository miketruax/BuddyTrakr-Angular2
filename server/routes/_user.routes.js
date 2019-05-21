//API ROUTES for User creation deletion and retrieval
import * as express from 'express';
import passport from 'passport';
let router = express.Router();
const bcrypt = require('bcrypt')
let crypto = require("crypto");
import jwt from "jsonwebtoken";
import {query} from '../config/pg.conf';
  

  //Admin routes
  let admin = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin')
      res.send(401);
    else
      next();
  };

router.get("/", (req, res) => {
  passport.authenticate('jwt-auth', (err, user, info) =>{
    return err || info ? res.send({user: {}}) : res.send({user: user})
  })(req, res)
  });

//Changing settings (currently only password updates)
router.post("/changeSettings", (req, res, next) => {
  passport.authenticate("jwt-auth", async (err, user, info) => {
    if (err) {
      return res.send({ err: err });
    }

    //Resets hash and password to new values
    let hashPassword = await bcrypt.hash(password, 8);

    let jwthash = crypto.randomBytes(20).toString("hex");
    query("UPDATE USERS jwthash = $1, password = $2 WHERE id = $3", [jwthash, hashPassword, user.id], (err, result)=>{
      if (err) {
        return res.send({
          err: "The server encountered an error, please try again later."
        });
      }
      let token = jwt.sign(
        { user: user, hash: user.jwthash },
        process.env.SESSION_SECRET,
        { expiresIn: 259200 }
        
      );
      res.send({ token: token });
    })
      })(req, res);
});

//admin route to delete a user
router.delete("/delete/:uid", admin, (req, res) => {
  query("DELETE FROM USERs WHERE users.id = $1", [req.params.uid], (err, result)=>{
    if (err) return next(err);
    res.status(204);

  })
}); 

export default router;
