var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('reports',{layout:'layouts/layout','footerClass':'bg-dark'});
});

module.exports = router;