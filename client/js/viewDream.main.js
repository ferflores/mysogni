Template.viewDream.rendered = function(){

	if(!Session.get('viewDream')){
		Router.go('dreamList');
	}

	$('#mainContent').velocity('transition.fadeIn', 1000);

}

Template.viewDream.helpers({
	"viewDream": function(){
		return Session.get("viewDream");
	}
});

Template.viewDream.events({
	"click .go-back": function(){
		window.history.back();
	}
});