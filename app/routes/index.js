var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Developer Onboarding' });
});

router.get('/map', function(req, res, next) {
  res.render('map', { title: 'Developer Onboarding' });
});

module.exports = router;
