var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
	title: String,
	body: String,
	updated: { type: Date, default: Date.now },
	userId: String
});

module.exports = mongoose.model('Entry', EntrySchema);