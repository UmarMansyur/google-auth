const express = require('express');
const router = express.Router();
const auth = require('./auth');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/', auth);


module.exports = router;
