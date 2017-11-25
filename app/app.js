var express	=	require("express");
var request = require('request');
var fs = require('fs');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var bodyParser =	require("body-parser");
var multer	=	require('multer');
var path = require('path');
var jsonParser = bodyParser.json();
var app	=	express();
var server = require('http').Server(app);
const config = require('./config.json');

var folderName;
var selectedUser;

app.use(express.static(path.resolve('./public')));

app.use(bodyParser.json());

var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, folderName);
  },
  filename: function (req, file, callback) {
    console.log("this is file name");
    console.log(file.originalname);
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage }).array('userPhoto');  //, config.limitPhotos);

app.get('/',function(req,res){
  res.sendFile(__dirname + "/public/index.html");
});

server.listen(config.nodePort,function(){
    console.log("Working on port " + config.nodePort);
});
