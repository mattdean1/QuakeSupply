var express = require('express');
var request = require('request');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('heroku_gv1rn240:gk10fvpl27rfjk4e882a035u4c@ds021026.mlab.com:21026/heroku_gv1rn240');
var collection = db.get('inventorytest');

const origin = "https://recruitment-hack.herokuapp.com";
//const origin = "http://localhost:3000";

//get list of all outposts.
router.get('/outposts', function(req, res, next) {
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});

//methods for operations on specific outposts
router.route('/outposts/:outpostid')
  .get(function(req, res) {
    //get info on an outpost
    collection.find({_id: req.params.outpostid},{},function(e,docs){
      if(e){
        res.send(e);
      }
      res.json(docs);
    });
  })
  .put(function(req, res) {
    //update an outpost
    collection.update({_id: req.params.outpostid},
                      {$set:{
                        'name': req.body.outpostname,
                        'supplies.food': parseInt(req.body.food),
                        'supplies.water': parseInt(req.body.water),
                        'supplies.tarpaulin': parseInt(req.body.tarpaulin)
                      }},
                      function(e){
                        if(e){
                          res.send(e);
                        }
                        res.send("update success");
                      }
    )
  })
  .delete(function(req, res) {
    //delete an outpost
    collection.remove({_id: req.params.outpostid},
                      function(e){
                        if(e){
                          res.send(e);
                        }
                        res.send("delete success");
                      }
    )
  });


// get list of significant earthquakes from the past week
router.get('/earthquakes', function(req, res, next) {
  request('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }else{
      res.redirect('overview', {title:'index'});
    }
  })
});

// add new outpost to db
router.post('/addoutpost', function(req, res) {
    collection.insert({
        "name" : req.body.outpostname,
        "coords": {
          "lat" : parseInt(req.body.lat),
          "long" : parseInt(req.body.long)
        },
        "supplies": {
          "food" : parseInt(req.body.food),
          "water" : parseInt(req.body.water),
          "tarpaulin" : parseInt(req.body.tarpaulin)
        }
    }, function (e, doc) {
        if (e) {
            res.send(e);
        }
        else {
            res.send({message:'outpost added'});
        }
    });
});

module.exports = router;
