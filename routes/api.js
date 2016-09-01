var express = require('express');
var request = require('request');
var router = express.Router();

/* GET list of outposts. */
router.get('/outposts', function(req, res, next) {
  var db = req.db;
  var collection = db.get('inventorytest');
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});

/* GET list of significant earthquakes from the past week */
router.get('/earthquakes', function(req, res, next) {
  request('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }else{
      res.redirect('overview', {title:'index'});
    }
  })
});

/* add new outpost to db */
router.post('/addoutpost', function(req, res) {
    // Set our internal DB variable
    var db = req.db;

    // Set our collection
    var collection = db.get('inventorytest');

    // Submit to the DB
    collection.insert({
        "name" : req.body.outpostname,
        "coords": {
          "lat" : parseInt(req.body.lat),
          "long" : parseInt(req.body.long)
        },
        "supplies": {
          "food" : 100,
          "water" : 100,
          "tarpaulin" : 100
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send(err);
        }
        else {
            // And forward to success page
            res.send({message:'outpost added'});
        }
    });
});

module.exports = router;
