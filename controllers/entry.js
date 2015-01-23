var Entry = require('../models/entries');

exports.postEntries = function(req, res) {
	var entry = Entry();
	entry.title = req.body.title;
	entry.body = req.body.body;
	entry.updated = req.updated.body;
	entry.userId = req.user._id;
	entry.save(function(err) {
	if (err)
		res.send(err);
	res.json({message: 'Posted successfully!', data: entry});
	});
};

exports.getEntries = function(req, res) {
	Entry.find({userId: req.user._id}, 
	function(err, entries) {
		if (err)
			res.send(err);
		res.json(entries);
	});
};

exports.getEntries = function(req, res) {
	Entry.findById({userId: req.user._id, _id: req.params.entry_id}, 
	function(err, entry) {
		if (err)
			res.send(err);
		res.json(entry);
	});
};