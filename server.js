var express 				= require('express');
var mongoose   			= require('mongoose');
var bodyParser 			= require('body-parser');
var entryController = require('./controllers/entry');
var userController  = require('./controllers/user');
var passport 				= require('passport');
var authController 	= require('./controllers/auth');
var path 			 			= require('path');
var logger 		 			= require('morgan');

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
	.post(authController.isAuthenticated, entryController.postEntries)
	.get(authController.isAuthenticated, entryController.getEntries);

router.route('/entries/:entry_id')
	.get(authController.isAuthenticated, entryController.getEntry)
	.put(authController.isAuthenticated, entryController.putEntry)
	.delete(authController.isAuthenticated, entryController.deleteEntry);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);


app.use('/api', router);

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port ' + port);