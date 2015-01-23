var Entries = Backbone.Collection.extend({
	model: Entry,
	url: '/api/entries',
	initialize: function() {
		this.fetch({reset: true});
	}
});

entries = new Entries({})