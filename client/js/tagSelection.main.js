Template.tagSelection.rendered = function(){
	Session.set("searchedTags", []);

	Meteor.call("getThreeRandomTags", {userId:Meteor.userId()}, randomTagsCallBack);

	function randomTagsCallBack(error, data){
		if(!error && data && data.length > 0){
			if(!Session.get("assignedTags") || Session.get("assignedTags").length < 1){
				Session.set("searchedTags", data);
			}
		}
	}
}

Template.tagSelection.helpers({
	"availableUserTags": function(){
		return Session.get("availableUserTags");
	},

	"searchedTagsAvailable": function(){
		return Session.get("searchedTags") && Session.get("searchedTags").length > 0;
	},

	"searchedTags": function(){
		return Session.get("searchedTags");
	}
});

Template.tagSelection.events({
	"keyup .search-tag": function(){
		if($(".search-tag").val().length > 0 && $(".search-tag").val().length < 20){
			Template.tagSelection.Utils.searchTag($(".search-tag").val());
		}else{
			//Session.set("searchedTags", []);
		}
	},

	"click .searched-tag":function(){
		var newAssignedTags = Session.get("assignedTags") || [];
		var addTag = true;

		for (var i = 0; i < newAssignedTags.length; i++) {
			if(newAssignedTags[i]._id == this._id){
				addTag = false;
				break;
			}
		};

		if(addTag){
			newAssignedTags.push(this);
			Session.set("assignedTags", newAssignedTags);

			var searchedTags = Session.get("searchedTags");

			for (var i = 0; i < searchedTags.length; i++) {
				if(searchedTags[i]._id == this._id){
					searchedTags.splice(i, 1);
				}
			};

			Session.set("searchedTags", searchedTags);
		}
	}
});

Template.tagSelection.Utils = {
	searchTag: function(text){

		Meteor.call("searchTag", 
			{userId:Meteor.userId(),
			 text:text, assignedTags:this.getAssignedTagsIds()}, searchTagCallBack);

		function searchTagCallBack(error, data){
			if(!error && data && data.length > 0){
				Session.set("searchedTags", data);
			}else{
				Session.set("searchedTags", []);
			}
		}
	},

	getAssignedTagsIds: function(){
		var assignedTagsIds = [];
		if(Session.get("assignedTags") && Session.get("assignedTags").length > 0){
			assignedTagsIds = jQuery.map(Session.get("assignedTags"), function(x){ return x._id});
		}

		return assignedTagsIds;
	}
}