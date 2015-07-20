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
	},

	"tagError": function(){
		return Session.get("tagError");
	}
});

Template.tagSelection.events({
	"keyup .search-tag": function(event){

		if($(".search-tag").val().length > 0 && $(".search-tag").val().length < 20){
			Template.tagSelection.Utils.searchTag($(".search-tag").val());
		}

		if($(".search-tag").val().length > 1){
			$(".assign-button").show();

			if (event.which === 13) {
				Session.set("tagError", null);
				Template.tagSelection.Utils.assignTag($(".search-tag").val());
				$(".search-tag").val('');
				$(".assign-button").hide();
			}

		}else{
			$(".assign-button").hide();
		}
	},

	"click .searched-tag":function(){
		Session.set("tagError", null);

		Template.tagSelection.Utils.assignTag(this.text);
	},

	"click .assign-button": function(){
		Session.set("tagError", null);

		var text = $(".search-tag").val();
		if(text.length>1){
			Template.tagSelection.Utils.assignTag(text);
		}
	},
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
	},

	assignTag: function(text){

		if(text.replace(/^[a-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
			Session.set("tagError", "Solo letras o números");
			return;
		}

		text = text.replace(/\s+/g, '');

		var newAssignedTags = Session.get("assignedTags") || [];
		var addTag = true;

		for (var i = 0; i < newAssignedTags.length; i++) {
			if(newAssignedTags[i].text == text){
				addTag = false;
				break;
			}
		};

		if(addTag){
			newAssignedTags.push({text:text});

			Session.set("assignedTags", newAssignedTags);

			var searchedTags = Session.get("searchedTags");

			for (var i = 0; i < searchedTags.length; i++) {
				if(searchedTags[i].text == text){
					searchedTags.splice(i, 1);
				}
			};

			Session.set("searchedTags", searchedTags);
		}
	}
}

Template.tagSelection.onDestroyed(function(){
	Session.set("tagError", null);
});