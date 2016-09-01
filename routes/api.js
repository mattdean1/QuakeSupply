var express = require('express');
var request = require('request');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('heroku_gv1rn240:gk10fvpl27rfjk4e882a035u4c@ds021026.mlab.com:21026/heroku_gv1rn240');
var collection = db.get('inventorytest');

const origin = "https://recruitment-hack.herokuapp.com";

//get list of all outposts.
router.get('/outposts', function(req, res, next) {
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});
//get info on a specific outpost
router.get('/outposts/:id', function(req, res, next) {
  collection.find({_id: req.params.id},{},function(e,docs){
    res.json(docs);
  });
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
          "food" : (parseInt(req.body.food) || 100),
          "water" : (parseInt(req.body.water) || 100),
          "tarpaulin" : (parseInt(req.body.tarpaulin) || 100)
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send(err);
        }
        else {
            if(req.body.manual=="true"){
              res.redirect(origin+"/overview");
            }else{
              res.send({message:'outpost added'});
            }
        }
    });
});

module.exports = router;
