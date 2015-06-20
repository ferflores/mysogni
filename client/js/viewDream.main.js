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
		Router.go("dreamList");
	},
	"click .edit-dream-text": function(){
		Session.set("editDream", Session.get("viewDream"));
		Router.go("editDream");
	},
	"click .edit-face": function(){
		Session.set("editFace", Session.get("viewDream"));
		Router.go("editFaces");
	},
	"click .edit-tags": function(){
		Session.set("editDreamTags", Session.get("viewDream"));
		Router.go("editTags");
	}
});