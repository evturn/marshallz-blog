var EntryView = Backbone.View.extend({
	tagName: 'li',
	className: 'entry',
	template: _.template($('#entry-view-template').html()),
	initialize: function() {

	},
	render: function() {

	},
	edit: function() {

	},
	remove: function() {

	}
});

var EntriesView = Backbone.View.extend({
	el: '#entries',
	initialize: function() {

	},
	addOne: function() {

	},
	addAll: function() {

	}
});

var CreateEntryView = Backbone.View.extend({
	el: '#create-entry',
	initialize: function() {

	},
	render: function() {

	},
	save: function() {

	}
});

// Update and Delete needed