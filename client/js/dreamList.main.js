Template.dreamList.rendered = function(){
	$('#mainContent').velocity('transition.fadeIn', 1000);
}

Template.dreamList.helpers({
	"isNewDream": function(){
		return Router.current().params.query.new;
	}
});