var express 				= require('express');
var mongoose   			= require('mongoose');
var bodyParser 			= require('body-parser');
var entryController = require('./controllers/entry');
var userController  = require('./controllers/user');
var passport 				= require('passport');
var authController 	= require('./controllers/auth');
var path 			 			= require('path');
var logger 		 			= require('morgan');
var request					= require('request');
var newEntry				= require('./lib/newEntry.js');

var app = express();
mongoose.connect('mongodb://localhost:27017/marshallz-blog');

var handlebars = require('express3-handlebars').create({
	  defaultLayout:'main',
    helpers: {
      section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
       	}
    }
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(passport.initialize());


app.get('/list', function(require, response) {
	response.render('index');
});

app.get('/', function(req, res) {
	res.render('latest', {
		entry: newEntry.createContent() 
	});
});

app.get('/entries/:id', function(req, res) {
	res.render('entry');
});

var router = express.Router();

router.route('/entries')
	.post(authController.isAuthenticated, entryController.postEntries)
	.get(entryController.getEntries);

router.route('/entries/:entry_id')
	.get(authController.isAuthenticated, entryController.getEntry)
	.put(authController.isAuthenticated, entryController.putEntry)
	.delete(authController.isAuthenticated, entryController.deleteEntry);

router.route('/users')
	.post(userController.postUsers)
	.get(authController.isAuthenticated, userController.getUsers);

app.use('/api', router);

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on ' + app.get('port') + '; press Ctrl-C to terminate');
});