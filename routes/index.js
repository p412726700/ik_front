var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index',{layout:'layouts/layout','footerClass':''});
});

module.exports = router;
