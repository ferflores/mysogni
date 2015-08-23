Template.viewDream.rendered = function(){

	if(!Session.get('viewDream')){
		FlowRouter.go('/dreamList');
		return;
	}

	Meteor.subscribe("dreamDateOptions");
}

Template.viewDream.helpers({
	"viewDream": function(){
		return Session.get("viewDream");
	},

	"dreamedOn": function(){
		return moment(Session.get("viewDream").dreamedOn).format('YYYY/MM/DD');
	}
});

Template.viewDream.events({
	"click .go-back": function(){
		FlowRouter.go("/dreamList");
	},

	"click .edit-dream-text": function(){
		Session.set("editDream", Session.get("viewDream"));
		FlowRouter.go("/editDream");
	},

	"click .edit-face": function(){
		Session.set("editFace", Session.get("viewDream"));
		FlowRouter.go("/editFaces");
	},

	"click .edit-tags": function(){
		Session.set("editDreamTags", Session.get("viewDream"));
		FlowRouter.go("/editTags");
	},

	"click .delete-dream": function(){
		
		Modals.confirmModal('Confirm',
		 "¿Seguro que deseas borrar este sueño?",
		 function(){
		 	Meteor.call("deleteDream", Session.get("viewDream")._id, 
		 		deleteDreamCallback())
		 });
		

		function deleteDreamCallback(err){
			if(!err){
				FlowRouter.go("/dreamList");
			}else{
				Modals.popupMessage("Error al guardar sueño",{error:err});
			}
		}
	}
});