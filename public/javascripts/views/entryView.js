var EntryView = Backbone.View.extend({
	el: '#entries',
	tagName: 'li',
	className: 'entry',
	template: _.template($('#entry-view-template').html()),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
});