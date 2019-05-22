import * as express from 'express';
import {query} from '../config/pg.conf'
import passport from 'passport';
let router = express.Router();
  
  router.route('/')
  .post(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
    dateAdded = req.body.dateAdded || (Date.now() / 1000);
    query(`INSERT INTO buddies ("name", "species", "binomial", "userID", "description", "dateAdded") VALUES ($1, $2, $3, $4, $5, to_timestamp($6))`, 
          [req.body.name, req.body.species,  req.body.binomial, req.user.id, req.body.description, dateAdded], 
          (err, result)=>{
            let buddy = Object.assign(req.body, {userID: req.user.id})
            return err ? res.send({err: 'An error occurred please try again later.'}) : res.status(200).send({buddy: buddy})
          }
    )
    })

    
    // gets all buddies based off current owner from user object (currently logged in via passport)
    .get(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query(`SELECT * FROM BUDDIES where "buddies"."userID" = $1`, [req.user.id], (err, result)=>{
        if(err){
          return res.send({err: 'An error occurred, please try again later.'})
        }
        return res.json({buddies: result.rows})
      })
    });


  router.route('/:buddy_id')
    //gets a single buddy by their _id
    .get(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query("SELECT * FROM BUDDIES WHERE id = $1", [req.params.buddy_id], (err, result)=>{
        if(err)
          res.send({err: 'An error occurred, please try again later.'});

        else
          res.json({buddy: result.rows[0]});
      })
    })
    //put request for updating buddies

    .put(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query(`SELECT * FROM BUDDIES WHERE BUDDIES.id = $1 AND "buddies"."userID" = $2`, [req.params.buddy_id, req.user.id], 
      (err, result)=>{
        if (err){
          return res.send({err: 'An error occurred, please try again later.'});
        }
        let updates = updateBuddy(req.body, result.rows[0]);
        if(!updates.altered){
          return res.send({buddy: updates.buddy})
        }
        let buddy = updates.buddy;

        query(`UPDATE BUDDIES SET 
        "name" = $1, "checkedOut" = $2, "species" = $3, "binomial" = $4, "description"= $5, 
        "timesOut" = $6, "lastOutDays" = $7, "totalDaysOut" = $8, "lastOutDate" = to_timestamp($9) WHERE buddies.id =$10`, 
          [buddy.name, buddy.checkedOut, buddy.species, buddy.binomial, buddy.description, 
            buddy.timesOut, buddy.lastOutDays, buddy.totalDaysOut, buddy.lastOutDate, req.params.buddy_id], 
          
          (err, result)=>{
            if (err){
              return res.status(500).send({err: 'An error occurred, please try again later.'});
            }
              res.send({buddy: buddy});
          }
        )

      })
      })

    //sad times to delete a buddy
    .delete(passport.authenticate('jwt-auth', ({session: false})), (req, res) => {
      query(`DELETE FROM BUDDIES WHERE BUDDIES.id = $1 AND "buddies"."userID" = $2`, [req.params.buddy_id, req.user.id], 
      (err, result)=>{
        if (err){
          return res.status(500).send({err: 'An error occurred, please try again later.'});
        }
          res.json({buddy: result.rows[0]});
      });
    });

export default router;



function updateBuddy(newBuddy, currBuddy){
        let altered = false;
        let alterableFields = ['name', 'species', 'binomial', 'description'];
        if(currBuddy.checkedOut !== newBuddy.checkedOut){
          altered = true;
          if(!newBuddy.checkedOut){
            currBuddy.timesOut++;
            currBuddy.lastOutDays = Math.ceil((Date.now() - new Date(currBuddy.lastOutDate)) / (1000 * 60 * 60 * 24)) ;
            currBuddy.totalDaysOut += currBuddy.lastOutDays;
          }
            currBuddy.lastOutDate = (Date.now() / 1000);
            currBuddy.checkedOut = newBuddy.checkedOut;
        }
        alterableFields.forEach(v=>{
          if(currBuddy[v] !== newBuddy[v]){
            altered = true;
            currBuddy[v] = newBuddy[v];
          }
        });

        if(newBuddy.dateAdded !== null && !currBuddy.dateAdded){
          currBuddy.dateAdded = newBuddy.dateAdded;
          altered = true;
        }
        return {altered: altered, buddy: currBuddy};
}

