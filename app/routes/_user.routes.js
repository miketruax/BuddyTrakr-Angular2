//API ROUTES for User creation deletion and retrieval

import User from '../models/user.model';

export default (app, router) => {
  router.route('/user')

    //post for creation will return either the error or list of users
    .post((req, res) => {
      User.create({
        text : req.body.text
      }, (err, user) => {

        if (err)
          res.send(err);

        User.find((err, users) => {
          if(err)
            res.send(err);

          res.json(users);
        });
      });
    })


    .get((req, res) => {
      //will retreive all user items from the DB
      User.find((err, user) => {

        if(err)
          res.send(err);

        else
          res.json(user);
      });
    });

  router.route('/user/:user_id')

    //get user by _id
    .get((req, res) => {

      // Use mongoose to a single user item by id in the database
      User.findOne(req.params.user_id, (err, user) => {

        if(err)
          res.send(err);

        else
          res.json(user);
      });
    })

    //updates user
    .put((req, res) => {

      User.findOne({ '_id' : req.params.user_id}, (err, user) => {

        if (err)
          res.send(err);

        // Only update a field if a new value has been passed in
        if (req.body.text)
          user.text = req.body.text;

        // save the user item
        return user.save((err) => {

          if (err)
            res.send(err);

          return res.send(user);

        });
      });
    })

    //deletes user
    .delete((req, res) => {

      // DEBUG
      console.log(`Attempting to delete user with id: ${req.params.user_id}`);

      User.remove({

        _id : req.params.user_id
      }, (err, user) => {

        if(err)
          res.send(err);

        console.log('User successfully deleted!');

        User.find((err, users) => {
          if(err)
            res.send(err);

          res.json(users);
        });
      });
    });
};
