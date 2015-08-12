Template.editTags.onCreated(function(){
	if(!Session.get('editDreamTags')){
		FlowRouter.go('/');
		return;
	}

});

Template.editTags.rendered = function(){

	Session.set('newAssignedTags', Session.get('editDreamTags').tags);

	if(!Session.get('newAssignedTags')){
		Session.setDefault('newAssignedTags', []);
	}

	Meteor.subscribe("userTags");

	Session.set("searchedTags", []);

}

Template.editTags.events({

	"click .assigned-tag": function(){
		var assignedTags = Session.get('newAssignedTags');

		for (var i = 0; i < assignedTags.length; i++) {
			if(assignedTags[i].text == this.text){
				assignedTags.splice(i, 1);
			}
		};

		Session.set('newAssignedTags', assignedTags);
	},

	"click .save-tags": function(){
		Template.editTags.Utils.saveTags();
	},

	"click .cancel-edit": function(){
		FlowRouter.go("/viewDream");
	},

	"keyup .search-tag": function(){
		if($(".search-tag").val().length > 0 && $(".search-tag").val().length < 20){
			$(".assign-button").show();

			Template.editTags.Utils.searchTag($(".search-tag").val());

			if (event.which === 13) {
				Template.editTags.Utils.assignTag($(".search-tag").val());
				$(".search-tag").val('');
				$(".assign-button").hide();
				Session.set("tagError", null);
			}
		}else{
			$(".assign-button").hide();
			//Session.set("searchedTags", []);
		}
	},

	"click .searched-tag":function(){
		var newAssignedTags = Session.get('newAssignedTags')|| [];
		var addTag = true;

		for (var i = 0; i < newAssignedTags.length; i++) {
			if(newAssignedTags[i].text == this.text){
				addTag = false;
				break;
			}
		};

		if(addTag){
			newAssignedTags.push(this);
			Session.set('newAssignedTags', newAssignedTags);

			var searchedTags = Session.get("searchedTags");

			for (var i = 0; i < searchedTags.length; i++) {
				if(searchedTags[i].text == this.text){
					searchedTags.splice(i, 1);
				}
			};

			Session.set("searchedTags", searchedTags);
		}
	}
});

Template.editTags.helpers({

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
		if(Session.get('editDreamTags')){
			var dreamText = Session.get('editDreamTags').text;
			var displayText = dreamText;

			if(dreamText && dreamText.length > 150){
				displayText = dreamText.substring(0, 150) + "...";
			}

			return displayText;
		}

		return "";
	},

	"assignedTags": function(){
		return Session.get("newAssignedTags");
	},

	"searchedTagsAvailable": function(){
		return Session.get("searchedTags") && Session.get("searchedTags").length > 0;
	},

	"searchedTags": function(){
		return Session.get("searchedTags");
	}
});

Template.editTags.Utils = {

	searchTag: function(text){

		Meteor.call("searchTag", 
			{userId:Meteor.userId(),
			 text:text, assignedTags:this.getAssignedTags()}, searchTagCallBack);

		function searchTagCallBack(error, data){
			if(!error && data && data.length > 0){
				Session.set("searchedTags", data);
			}else{
				Session.set("searchedTags", []);
			}
		}
	},

	getAssignedTags: function(){
		var assignedTagsIds = [];
		if(Session.get('newAssignedTags') && Session.get('newAssignedTags').length > 0){
			assignedTagsIds = jQuery.map(Session.get('newAssignedTags'), function(x){ return x.text});
		}

		return assignedTagsIds;
	},

	assignTag: function(text){

		if(text.replace(/^[a-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
			Session.set("tagError", "Solo letras o números");
			return;
		}

		text = text.replace(/\s+/g, '');

		var newAssignedTags = Session.get("newAssignedTags") || [];
		var addTag = true;

		for (var i = 0; i < newAssignedTags.length; i++) {
			if(newAssignedTags[i].text == text){
				addTag = false;
				break;
			}
		};

		if(addTag){
			newAssignedTags.push({text:text});

			Session.set("newAssignedTags", newAssignedTags);

			var searchedTags = Session.get("searchedTags");

			for (var i = 0; i < searchedTags.length; i++) {
				if(searchedTags[i].text == text){
					searchedTags.splice(i, 1);
				}
			};

			Session.set("searchedTags", searchedTags);
		}
	},

	saveTags: function(callBack){
		Meteor.call("updateDreamTags", 
			{
				dreamId:Session.get("editDreamTags")._id,
				assignedTags: Session.get("newAssignedTags")
			}, createDreamCallBack);

		function createDreamCallBack(error, data){
			if(error){
				Modals.errorModal("Error al guardar tags",{error:error});
			}else{
				var viewDream = Session.get("viewDream");
				viewDream.tags = Session.get('newAssignedTags');
				Session.set("viewDream", viewDream);
				Session.set("newAssignedTags", []);
				FlowRouter.go("/viewDream");
			}
		}
	}
}

Template.editTags.onDestroyed(function () {
	Session.set('newAssignedTags', null);
	Session.set("searchedTags", null);
});