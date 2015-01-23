var express 	 = require('express');
var mongoose   = require('mongoose');
var path 			 = require('path');
var logger 		 = require('morgan');
var bodyParser = require('body-parser');




var app = express();
app.use(express.static('public'));

var port = process.env.PORT || 3000;
var router = express.Router();

app.get('/', function(require, response) {
	response.render('index.html');
});


app.listen(port, function() {
	console.log('Listening on localhost:5000');
});