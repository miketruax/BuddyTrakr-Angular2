
import Buddy from '../models/buddy.model';
export default (app, router) => {
  router.route('/buddy')
    //post for buddy creation
    .post((req, res) => {

      Buddy.create({
        name : req.body.name,

        species : req.body.species,

        binomial : req.body.binomial,

        description : req.body.description,

        owner : req.user._id

      }, (err, buddy) => {

        if (err)
          res.send(err);

        // DEBUG
        console.log(`Buddy created: ${buddy}`);
        // return the new `buddy` to our front-end
        res.json(buddy);
      });
    })
    // gets all buddies based off current owner from user object (currently logged in via passport)
    .get((req, res) => {
      Buddy.find({'owner' : req.user._id }).populate('owner', 'local.username').exec((err, buddy) => {
        if(err) {
          //sends error if there is an error
          res.send(err);
        }
        else {
          //otherwise sends buddy list!
          buddy.sort((a, b) => {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          });
          res.json(buddy);
        }
      });
    });


  router.route('/buddy/:buddy_id')
    //gets a single buddy by their _id
    .get((req, res) => {
      Buddy.findOne(req.params.buddy_id, (err, buddy) => {

        if(err)
          res.send(err);

        else
          res.json(buddy);
      });
    })

    //put request for updating buddies
    .put((req, res) => {
      Buddy.findOne({

        '_id' : req.params.buddy_id
      }, (err, buddy) => {

        if (err)
          res.send(err);

        //Only update fields that have been edited
        if (req.body.name)
          buddy.name = req.body.name;

        if (req.body.checkedOut !== undefined)
          buddy.checkedOut = req.body.checkedOut;

        if (req.body.species)
          buddy.species = req.body.species;

        if (req.body.binomial)
          buddy.binomial = req.body.binomial;

        if (req.body.checkedOut)
          buddy.checkedOut = req.body.checkedOut;

        if (req.body.description)
          buddy.description = req.body.description;

        return buddy.save((err) => {
          //either send an error back to front-end or the buddy to be re-added to store
          if (err){
            console.log(err);
            res.send(err);
          }
          return res.send(buddy);

        });
      });
    })

    //sad times to delete a buddy
    .delete((req, res) => {

      // debug log statement
      console.log(`Attempting to delete buddy with id: ${req.params.buddy_id}`);

      Buddy.remove({
        _id : req.params.buddy_id
      }, (err, buddy) => {
        if(err)
          res.send(err);
        else
          console.log('Buddy successfully deleted!');
        Buddy.find((err, buddies) => {
          if(err)
            res.send(err);
          res.json(buddies);
        });
      });
    });
};
