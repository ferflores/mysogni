Template.tags.onCreated(function(){
	if(!Session.get("dreamText")){
		Router.go("home");
	}

	if(!Session.get('selectedFace')){
		Router.go("faces");
	}
});

Template.tags.rendered = function(){
	Meteor.subscribe("userTags");

	if(!Session.get("assignedTags")){
		Session.set("assignedTags", []);
	}
}

Template.tags.events({

	"click .edit-dream": function(){
		Router.go("home");
	},

	"click .assigned-tag": function(){
		var assignedTags = Session.get("assignedTags");

		for (var i = 0; i < assignedTags.length; i++) {
			if(assignedTags[i]._id == this._id){
				assignedTags.splice(i, 1);
			}
		};

		Session.set("assignedTags", assignedTags);
	},

	"click .save-dream": function(){
		Template.tags.Utils.saveDream();
	}
});

Template.tags.helpers({

	"availableUserTags": function(){
		var userTags = [];
		var existingUserTags = UserTags.findOne({userId:Meteor.userId()});
		if(existingUserTags){
			userTags = existingUserTags.tags;
		}

		Session.set("availableUserTags", userTags);

		return Session.get("availableUserTags");
	},

	"dreamText": function(){
		var dreamText = Session.get("dreamText");
		var displayText = dreamText;

		if(dreamText && dreamText.length > 150){
			displayText = dreamText.substring(0, 150) + "...";
		}

		return displayText;
	},

	"assignedTags": function(){
		return Session.get("assignedTags");
	},

	"selectedFace": function(){
		var file = "";
		if(Session.get('selectedFace')){
			file = Session.get('selectedFace').file;
		}
		return file;
	}
});

Template.tags.Utils = {

	saveDream: function(callBack){
		Meteor.call("saveDream", 
			{
				text:Session.get("dreamText"), 
				mood: Session.get("selectedFace"), 
				assignedTags: Session.get("assignedTags")
			}, createDreamCallBack);

		function createDreamCallBack(error, data){
			if(error){
				Modals.errorModal("Error al guardar sueño",{error:error});
			}else{
				Session.set("dreamText", null);
				Session.set("assignedTags", []);
				Session.set("selectedFace", null);
				Router.go("dreamList",{}, {query:"new=1"});
			}
		}
	}
}