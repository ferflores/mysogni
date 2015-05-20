Template.dreamList.rendered = function(){
	Meteor.subscribe("dreams");

	$('#mainContent').velocity('transition.fadeIn', 1000);
}

Template.dreamList.helpers({
	"isNewDream": function(){
		return Router.current().params.query.new;
	},

	"dreams": function(){
		return Dreams.find({},{sort:{createdOn:-1}});
	}
});