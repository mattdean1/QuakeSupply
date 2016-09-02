var express = require('express');
var request = require('request');
var router = express.Router();

// const origin = "https://recruitment-hack.herokuapp.com";
const origin = "http://localhost:3000";

//redirect to overvew
router.get('/', function(req, res, next) {
  res.redirect('overview');
});

//render new outpost form
router.get('/newoutpost', function(req, res) {
    res.render('newoutpost', { title: 'New' });
});

//render overview using data from /api/outposts
router.get('/overview', function(req, res) {
    request(origin+'/api/outposts', function (error, response, body) {
        res.render('inventoryoverview', {
                 title : 'Overview',
                 outpostlist : JSON.parse(body)
             });
    });
});

//render map using data from /api/outposts
router.get('/outpostmap', function(req, res) {
    request(origin+'/api/outposts', function (error, response, body) {
        res.render('outpostmap', {
                 title : 'Map',
                 outpostlist : JSON.parse(body)
             });
    });
});

//render edit page using data from /api/outposts/:id
router.get('/editoutpost/:outpostid', function(req, res, next) {
  request(origin+'/api/outposts/'+req.params.outpostid, function (error, response, body) {
      res.render('editoutpost', {
               title : 'Edit',
               outpostlist : JSON.parse(body)
           });
  });
});

module.exports = router;
