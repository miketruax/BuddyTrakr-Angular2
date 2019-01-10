//API ROUTES for User creation deletion and retrieval
import * as express from 'express';
import passport from 'passport';
let router = express.Router();
let crypto = require("crypto");
import jwt from "jsonwebtoken";
  

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
  passport.authenticate("jwt-auth", (err, user, info) => {
    if (err) {
      return res.send({ err: err });
    }

    //Resets hash and password to new values
    user.local.password = req.body.newPassword;
    user.jwthash = crypto.randomBytes(20).toString("hex");
    user.save((err, user) => {
      if (err) {
        return res.send({
          err: "The server encountered an error, please try again later."
        });
      }
      let token = jwt.sign(
        { user: user.sanitize(), hash: user.jwthash },
        process.env.SESSION_SECRET,
        { expiresIn: 259200 }
      );
      res.send({ token: token });
    });
  })(req, res);
});

//admin route to delete a user
router.delete("/delete/:uid", admin, (req, res) => {
  User.remove(
    {
      // Model.find `$or` Mongoose condition
      $or: [
        { "local.username": req.params.uid },

        { "local.email": req.params.uid },

        { _id: ObjectId(req.params.uid) }
      ]
    },
    err => {
      // If there are any errors, return them
      if (err) return next(err);

      // HTTP Status code `204 No Content`
      res.status(204);
    }
  );
});

export default router;
