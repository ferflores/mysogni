Template.viewDream.rendered = function(){

	if(!Session.get('viewDream')){
		Router.go('dreamList');
	}

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
	},
	"click .delete-dream": function(){
		Meteor.call("deleteDream", this._id, deleteDreamCallback());

		function deleteDreamCallback(err){
			if(!err){
				Router.go("dreamList");
			}else{
				Modals.errorModal("Error al guardar sueño",{error:err});
			}
		}
	}
});