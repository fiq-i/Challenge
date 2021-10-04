var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'BREAD (Browser, Read, Edit, Add, Delete)' });
});

module.exports = router;
