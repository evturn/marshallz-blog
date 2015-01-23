var EntriesView = Backbone.View.extend({
	el: '#blog-entries',
	tagName: 'ul',
	className: 'entries',
	initialize: function() {
		this.listenTo(this.collection, 'reset', this.addAll);
	},
	addOne: function(model) {
		var entryView = new EntryView({model: model});
		this.$el.append(entryView.el);
	},
	addAll: function() {
		this.collection.each(function(model) {
			this.addOne(model);
		}.bind(this));
	}
});
