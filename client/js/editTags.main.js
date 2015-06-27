Template.editTags.onCreated(function(){
	if(!Session.get('editDreamTags')){
		Router.go('home');
		return;
	}

});

Template.editTags.rendered = function(){

	Session.set('newAssignedTags', Session.get('editDreamTags').tags);

	if(!Session.get('newAssignedTags')){
		Session.setDefault('newAssignedTags', []);
	}

	Meteor.subscribe("userTags");
	Meteor.subscribe("tagCategories");

	Session.set("searchedTags", []);

}

Template.editTags.events({
	"click .create-tag": function(){
		Template.editTags.Utils.createTag();
	},

	"keypress .tag-input": function(event){
		if((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)){
			Template.editTags.Utils.createTag();
		}
	},

	"click .assigned-tag": function(){
		var assignedTags = Session.get('newAssignedTags');

		for (var i = 0; i < assignedTags.length; i++) {
			if(assignedTags[i]._id == this._id){
				assignedTags.splice(i, 1);
			}
		};

		Session.set('newAssignedTags', assignedTags);
	},

	"click .save-tags": function(){
		Template.editTags.Utils.saveTags();
	},

	"click .cancel-edit": function(){
		Router.go("viewDream");
	},
	"keyup .search-tag": function(){
		if($(".search-tag").val().length > 0 && $(".search-tag").val().length < 20){
			Template.editTags.Utils.searchTag($(".search-tag").val());
		}else{
			//Session.set("searchedTags", []);
		}
	},

	"click .searched-tag":function(){
		var newAssignedTags = Session.get('newAssignedTags')|| [];
		var addTag = true;

		for (var i = 0; i < newAssignedTags.length; i++) {
			if(newAssignedTags[i]._id == this._id){
				addTag = false;
				break;
			}
		};

		if(addTag){
			newAssignedTags.push(this);
			Session.set('newAssignedTags', newAssignedTags);

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

Template.editTags.helpers({
	"createTagError": function(){
		return Session.get("createTagError");
	},

	"creatingTag": function(){
		return Session.get("creatingTag");
	},

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

	"tagCategories": function(){
		var categories = TagCategories.find({});
		var translatedCategories = jQuery.map(categories.fetch(), function(e){
			return {value:e.value, text:e[Meteor.I18n().lang()]}
		});

		return translatedCategories;
	},

	"searchedTagsAvailable": function(){
		return Session.get("searchedTags") && Session.get("searchedTags").length > 0;
	},

	"searchedTags": function(){
		return Session.get("searchedTags");
	}
});

Template.editTags.Utils = {
	createTag: function(){
		Session.set("createTagError","");
		var tagText = $(".tag-input").val();
		var category = $(".tag-category").val();

		if(tagText.length < 1){
			Session.set("createTagError","Escribe el nombre de la etiqueta");
		}else if(tagText.replace(/^[A-Za-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
			Session.set("createTagError","Solo números y letras por favor");
		}else{
			Session.set("creatingTag", true);
			Meteor.call("createTag", {text:tagText, category: category}, createTagCallBack);
		}

		function createTagCallBack(error, data){
			Session.set("creatingTag", false);
			if(error){
				Session.set("createTagError","Error al crear etiqueta");
			}else{
				var newAssignedTags = Session.get('newAssignedTags') || [];
				newAssignedTags.push(data);
				Session.set('newAssignedTags', newAssignedTags);
				$(".tag-input").val('');
			}
		}
	},

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
		if(Session.get('newAssignedTags') && Session.get('newAssignedTags').length > 0){
			assignedTagsIds = jQuery.map(Session.get('newAssignedTags'), function(x){ return x._id});
		}

		return assignedTagsIds;
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
				Router.go("viewDream");
			}
		}
	}
}

Template.editTags.onDestroyed(function () {

});