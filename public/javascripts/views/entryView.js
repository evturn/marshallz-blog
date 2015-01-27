var EntryView = Backbone.View.extend({
	tagName: 'li',
	className: 'entry well well-large',
	template: _.template($('#entry-template').html()),
	initialize: function() {
		this.render();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
});