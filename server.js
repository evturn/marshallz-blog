var express 	 = require('express');
var mongoose   = require('mongoose');
var path 			 = require('path');
var logger 		 = require('morgan');
var bodyParser = require('body-parser');
var entryController = require('./controllers/entry');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/marshallz-blog');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(passport.initialize());

var router = express.Router();

router.get('/', function(require, response) {
	response.render('index.html');
});


router.route('/entries')
	.post(entryController.postEntries)
	.get(entryController.getEntries);

router.route('/entries/:entry_id')
	.get(entryController.getEntry)
	.put(entryController.putEntry)
	.delete(entryController.deleteEntry);

router.route('/users')
	.post(userController.postUsers)
	.get(userController.getUsers);


app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on localhost:3000');
});