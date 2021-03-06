var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');

var routes = require('./routes/index');
var users = require('./routes/users');
var reglogin=require('./routes/reglogin');
var advantage=require('./routes/advantage');
var reports=require('./routes/reports');
var aboutus=require('./routes/aboutus');
var recruit=require('./routes/recruit');
var safe=require('./routes/safe');
var contact=require('./routes/contact');

var help=require('./routes/help');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout2');
app.set("layout extractScripts", true);

app.use(expressLayouts);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users', users);
app.use('/reglogin', reglogin);
app.use('/advantage',advantage);
app.use('/reports',reports);
app.use('/aboutus',aboutus);
app.use('/recruit',recruit);
app.use('/safe',safe);
app.use('/contact',contact);

app.use('/help',help);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
