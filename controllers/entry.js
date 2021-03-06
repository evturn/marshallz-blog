var Entry = require('../models/entry');

exports.postEntries = function(req, res) {
	var entry = Entry();
	entry.title = req.body.title;
	entry.body = req.body.body;
	entry.userId = req.user._id;
	entry.save(function(err) {
	if (err)
		res.send(err);
	res.json({message: 'Posted successfully!', data: entry});
	});
};

exports.getEntries = function(req, res) {
	Entry.find(function(err, entries) {
		if (err)
			res.send(err);
		res.json(entries);
	});
};

exports.getEntry = function(req, res) {
	Entry.findById({_id: req.params.entry_id}, 
	function(err, entry) {
		if (err)
			res.send(err);
		res.json(entry);
	});
};

exports.putEntry = function(req, res) {
  Entry.update({userId: req.user._id, _id: req.params.entry_id},
  {title: req.body.title}, 
  {body: req.body.body}, 
  function(err, num, raw) {
    if (err)
      res.send(err);
    res.json({message: num + ' updated'});
  });
};

exports.deleteEntry = function(req, res) {
  Entry.remove({_id: req.params.entry_id}, 
  function(err) {
    if (err)
      res.send(err);
    res.json({message: 'Entry deleted!'});
  });
};