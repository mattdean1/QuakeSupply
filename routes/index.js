var express = require('express');
var request = require('request');
var router = express.Router();

const origin = "https://recruitment-hack.herokuapp.com";

//redirect to overvew
router.get('/', function(req, res, next) {
  res.redirect('overview');
});

//render new outpost form
router.get('/newoutpost', function(req, res) {
    res.render('newoutpost', { title: 'Add New outpost' });
});

//render overview using data from /api/outposts
router.get('/overview', function(req, res) {
    request(origin+'/api/outposts', function (error, response, body) {
        res.render('inventoryoverview', {
                 title : 'outpost overview',
                 outpostlist : JSON.parse(body)
             });
    });
});

//render map using data from /api/outposts
router.get('/outpostmap', function(req, res) {
    request(origin+'/api/outposts', function (error, response, body) {
        res.render('outpostmap', {
                 title : 'outpost map',
                 outpostlist : JSON.parse(body)
             });
    });
});

//render edit page using data from /api/outposts/:id
router.get('/editoutpost/:id', function(req, res, next) {
  request(origin+'/api/outposts/'+req.params.id, function (error, response, body) {
      res.render('editoutpost', {
               title : 'edit outpost',
               outpostlist : JSON.parse(body)
           });
  });
});

module.exports = router;
