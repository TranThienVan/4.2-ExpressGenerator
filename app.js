require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./api/index');
const { nextTick } = require('process');
// var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware

// Middleware can access req, res, next

function ourCustomMiddleware(req, res, next){
    console.log("ourCustomMiddleware")
    req.sam = "Ham"
    // If query page exists, req.page will equal to req.query.page
    // if(req.query.page){
    //     req.page = req.query.page;
    // }
    // // If limit page exists, req.limit will equal to req.query.limit
    // if(req.query.limit){
    //     req.limit = req.query.limit;
    // }

    // Web may request 20
    // Mobile may request 3
    req.page = req.query.page || 1;
    req.limit = req.query.limit || 20;

    next()
}
app.use(ourCustomMiddleware)

app.use('/', ourCustomMiddleware, indexRouter);


module.exports = app;
