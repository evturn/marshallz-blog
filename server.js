var express 	 = require('express');
var mongoose   = require('mongoose');
var path 			 = require('path');
var logger 		 = require('morgan');
var bodyParser = require('body-parser');
var Entry 		 = require('./models/entry');
var entryController = requre('./controllers/entry');

mongoose.connect('mongodb://localhost:27017/marshallz-blog');

var app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

var port = process.env.PORT || 3000;
var router = express.Router();

router.get('/', function(require, response) {
	response.render('index.html');
});


var entriesRoute = router.route('/entries');

router.route('/entries')
	.post(entryController.postEntries)
	.get(entryController.getEntries);

router.route('/entries/:entry_id')
	.get(entryController.getEntry)
	.put(entryController.putEntry)
	.delete(entryController.deleteEntry);


app.use('/api', router);

app.listen(port, function() {
	console.log('Listening on localhost:3000');
});