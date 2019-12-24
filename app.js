var express = require("express");
var app = express();
var path = require("path");

const mysql = require('mysql');

var cookie_parser = require ("cookie-parser");
var session = require("express-session");


var bodyparser = require("body-parser");
app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({limit: '10mb',extended: false}));
app.use(cookie_parser());

app.use(express.static(path.join(__dirname,'public')));

 // session secret
 app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: true
}));



var loginhome = require("./routes/product");

app.use('/',loginhome);
app.listen(9006,function(){
console.log("server started @ 9006");
})