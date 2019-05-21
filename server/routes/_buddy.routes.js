import * as express from 'express';
import {query} from '../config/pg.conf'
import passport from 'passport';
let router = express.Router();
  
  router.route('/')
  .post(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
    query(`INSERT INTO BUDDIES (name, species, binomial, userID, description, dateAdded) VALUES ($1, $2, $3, $4, $5, $6)`, 
          [req.body.name, req.body.species, req.user.id, req.body.binomial, req.body.description, req.body.dateAdded], 
          (err, result)=>{
            let buddy = Object.assign(req.body, {userID: req.user.id})
            return err ? res.send({err: 'And error occured please try again later.'}) : res.status(200).send({buddy: buddy})
          }
    )
    })

    
    // gets all buddies based off current owner from user object (currently logged in via passport)
    .get(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query("SELECT * FROM BUDDIES where userID = $1", [req.user.id], (err, result)=>{
        if(err){
          return res.send({err: 'An error occured, please try again later.'})
        }
        return res.json({buddies: buddy})
      })
    });


  router.route('/:buddy_id')
    //gets a single buddy by their _id
    .get(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query("SELECT * FROM BUDDIES WHERE id = $1", [req.params.buddy_id], (err, result)=>{
        if(err)
          res.send({err: 'An error occured, please try again later.'});

        else
          res.json({buddy: result[0]});
      })
    })
    //put request for updating buddies
    .put(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query("SELECT * FROM BUDDIES WHERE BUDDIES.id = $1 AND BUDDIES.userID = $2", [req.params.buddy_id, req.user.id], 
      (err, result)=>{
        if (err){
          return res.send({err: 'An error occurred, please try again later.'});
        }
        let buddy = result[0];
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
          return res.send({buddy: buddy});
        }

        query("UPDATE BUDDIES SET (name, checkedOut, species, binomial, description) VALUES ($1, $2, $3, $4, $5)", 
          [buddy.name, buddy.checkedOut, buddy.species, buddy.binomial, buddy.description], (err, result)=>{
            if (err){
              return res.status(500).send({err: 'An error occured, please try again later.'});
            }
              res.send({buddy: buddy});
          }
        )

      })
      })

    //sad times to delete a buddy
    .delete(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query("DELETE FROM BUDDIES WHERE BUDDIES.id = $1 AND BUDDIES.userID = $2", [req.params.buddy_id, req.user.id], 
      (err, result)=>{
        if (err){
          return res.status(500).send({err: 'An error occured, please try again later.'});
        }
          res.json({buddy: result[0]});
      });
    });

export default router;
