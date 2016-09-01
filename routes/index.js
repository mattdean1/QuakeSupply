var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('overview');
});

router.get('/map', function(req, res, next) {
      res.render('map', {title:'map'});
});

router.get('/overview', function(req, res) {
    var db = req.db;
    var collection = db.get('inventorytest');
    collection.find({},{},function(e,docs){
        res.render('inventoryoverview', {
            title : 'outpost overview',
            "outpostlist" : docs
        });
    });
});
router.get('/newoutpost', function(req, res) {
    res.render('newoutpost', { title: 'Add New outpost' });
});
router.post('/addoutpost', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.email;

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
          "food" : parseInt(req.body.food),
          "water" : parseInt(req.body.water),
          "tarpaulin" : parseInt(req.body.tarpaulin)
        }
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("overview");
        }
    });
});
router.get('/outpostmap', function(req, res) {
    var db = req.db;
    var collection = db.get('inventorytest');
    collection.find({},{},function(e,docs){
        res.render('outpostmap', {
            title : 'outpost map',
            outpostlist : JSON.stringify(JSON.stringify(docs))
        });
    });
});
module.exports = router;
