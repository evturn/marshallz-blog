var express 	 = require('express');
var mongoose   = require('mongoose');
var path 			 = require('path');
var logger 		 = require('morgan');
var bodyParser = require('body-parser');
var Entry 		 = require('./models/entry');

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

entriesRoute.post(function(req, res) {
	var entry = new Entry();
	entry.title = req.body.title;
	entry.body = req.body.body;
	entry.save(function(err) {
		if (err)
			res.send(err);
		res.json({message: 'Entry successfully posted!', data: entry});
	});
});
entriesRoute.get(function(req, res) {
	Entry.find(function(err, entries) {
		if (err)
			res.send(err);
		res.json(entries);
	});
});


var entryRoute = router.route('/entries/:entry_id');

entryRoute.get(function(req, res) {
	Entry.findById(req.params.entry_id, function(err, entry) {
		if (err)
			res.send(err);
		res.json(entry);
	});
});
entryRoute.put(function(req, res) {
	Entry.findById(req.params.entry_id, function(err, beer) {
		if (err)
			res.send(err);
		entry.title = req.body.title;
		entry.body = req.body.body;
		entry.save(function(err) {
			if (err)
				res.send(err)
			res.json(entry);
		});
	});
});
entryRoute.delete(function(req, res) {
	Entry.findByIdAndRemove(req.params.entry_id, function(err) {
		if (err)
			res.send(err);
		res.json({message: 'Post removed!'});
	});
});


app.use('/api', router);

app.listen(port, function() {
	console.log('Listening on localhost:3000');
});