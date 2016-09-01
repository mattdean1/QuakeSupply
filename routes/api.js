var express = require('express');
var request = require('request');
var router = express.Router();

/* GET users listing. */
router.get('/outposts', function(req, res, next) {
  var db = req.db;
  var collection = db.get('inventorytest');
  collection.find({},{},function(e,docs){
      res.json(docs);
  });
});

router.get('/sigweek', function(req, res, next) {
  request('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(JSON.parse(body));
    }else{
      res.redirect('overview', {title:'index'});
    }
  })
});



module.exports = router;
