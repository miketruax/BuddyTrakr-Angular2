import Buddy from '../models/buddy.model';
import * as express from 'express';
import passport from 'passport';
let router = express.Router();
  
  router.route('/')
  .post(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      Buddy.create({
        name : req.body.name,
        species : req.body.species,
        binomial : req.body.binomial,
        description : req.body.description,
        owner : req.user._id,
        dateAdded: Date.now()

      }, (err, buddy) => {

        if (err)
          res.send({err: 'An error occured, please try again later.'});

        res.json({buddy: buddy});
      });
    })
    // gets all buddies based off current owner from user object (currently logged in via passport)
    .get(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      Buddy.find({'owner' : req.user._id }).populate('owner', 'local.username').exec((err, buddy) => {
        if(err) {
          //sends error if there is an error
          res.send({err: 'An error occured, please try again later.'});
        }
        else {
          //otherwise sends buddy list!
          buddy.sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          });
          res.json({buddy: buddy});
        }
      });
    });


  router.route('/:buddy_id')
    //gets a single buddy by their _id
    .get(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      Buddy.findOne(req.params.buddy_id, (err, buddy) => {

        if(err)
          res.send({err: 'An error occured, please try again later.'});

        else
          res.json({buddy: buddy});
      });
    })
    //put request for updating buddies
    .put(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      Buddy.findOne({
        '_id' : req.params.buddy_id,
        'owner': req.user._id
      }, (err, buddy) => {

        if (err){
          return res.send({err: 'An error occured, please try again later.'});
        }
        //Only update fields that have been edited
        let altered = false;
        let alterableFields = ['name', 'checkedOut', 'species', 'binomial', 'description'];
        alterableFields.forEach(v=>{
          if(req.body[v] !== buddy[v]){
            altered = true;
            buddy[v] = req.body[v];
          }
        });

        if(req.body.dateAdded !== null && !buddy.dateAdded){
          buddy.dateAdded = req.body.dateAdded;
          altered = true;
        }

        if(!altered){
          return res.send({err: 'No changes to save'});
        }
        return buddy.save((err) => {
          //either send an error back to front-end or the buddy to be re-added to store
          if (err){
            res.send({err: 'An error occured, please try again later.'});
          }
          else {
            res.send({buddy: buddy});
          }
        });
      });
    })

    //sad times to delete a buddy
    .delete(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      
      Buddy.remove({
        _id : req.params.buddy_id,
        'owner': req.user._id
      }, (err, buddy) => {
        if (err){
          return res.send({err: 'An error occured, please try again later.'});
        }
        Buddy.find((err, buddies) => {
          if(err)
            res.send({err: 'An error occured, please try again later.'});
          res.json({buddy: buddies});
        });
      });
    });

export default router;
