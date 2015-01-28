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

var app = express();
mongoose.connect('mongodb://localhost:27017/marshallz-blog');

var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(passport.initialize());

app.get('/', function(require, response) {
	response.render('index');
});


businessAbstracts = [];
var businessRequest = function() {
	businessSection = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/business/1.json?api-key=' + process.env.NYT_KEY;
	request(businessSection, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			var responseObject = (JSON.parse(body));
			var articleArr     = responseObject.results
			articleArr.forEach(function(article) {
				businessAbstracts.push(article.abstract);
			});
		pickBusiness();
		} else {
			throw err;
		};
});
};

foodAbstracts = [];
var foodRequest = function() {
	foodSection = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/food/1.json?api-key=' + process.env.NYT_KEY;
	request(foodSection, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			var responseObject = (JSON.parse(body));
			var articleArr     = responseObject.results
			articleArr.forEach(function(article) {
				foodAbstracts.push(article.abstract);
			});
		pickFood();
		} else {
			throw err;
		};
	});
};

healthAbstracts = [];
var healthRequest = function() {
	healthSection = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/health/1.json?api-key=' + process.env.NYT_KEY;
	request(healthSection, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			var responseObject = (JSON.parse(body));
			var articleArr     = responseObject.results
			articleArr.forEach(function(article) {
				healthAbstracts.push(article.abstract);
			});
		pickHealth();
		} else {
			throw err;
		};
	});
}

var entryContent = function() {
	newEntry = sentenceArr.join(' ');
	console.log(newEntry);
	//Value of body for new entry
};

sentenceArr = [];
var concatenateAbstracts = function() {
	category1 = articleAbstracts[0];
	category2 = articleAbstracts[1];
	category3 = articleAbstracts[2];
	sentence1 = category1[0]
	sentenceArr.push(sentence1)
	sentence2 = category2[0]
	sentenceArr.push(sentence2)
	sentence3 = category3[0]
	sentenceArr.push(sentence3)
	entryContent();
};

articleAbstracts = [];
var pickBusiness = function(){
	threeBusiness = businessAbstracts.slice(1, 4);
	articleAbstracts.push(threeBusiness);
	foodRequest();
};
var pickFood = function(){
	threeFood = foodAbstracts.slice(1, 4);
	articleAbstracts.push(threeFood);
	healthRequest();
};
var pickHealth = function(){
	threeHealth = healthAbstracts.slice(1, 4);
	articleAbstracts.push(threeHealth);
	concatenateAbstracts();
};

//GET request to NYT
businessRequest();


var router = express.Router();

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
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate');
});