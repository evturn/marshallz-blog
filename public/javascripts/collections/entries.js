var Entries = Backbone.Collection.extend({
	model: Entry,
	url: '/api/entries'
});