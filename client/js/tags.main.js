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
	Meteor.subscribe("tagCategories");

	if(!Session.get("assignedTags")){
		Session.set("assignedTags", []);
	}

	$('#mainContent').velocity('transition.fadeIn', 1000);
}

Template.tags.events({
	"click .create-tag": function(){
		Template.tags.Utils.createTag();
	},

	"keypress .tag-input": function(event){
		if((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)){
			Template.tags.Utils.createTag();
		}
	},

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

		//Router.go("dreamList",{}, {query:"new=1"});
		Template.tags.Utils.saveDream();
	}
});

Template.tags.helpers({
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

	"tagCategories": function(){
		var categories = TagCategories.find({});
		var translatedCategories = jQuery.map(categories.fetch(), function(e){
			return {value:e.value, text:e[Meteor.I18n().lang()]}
		});

		return translatedCategories;
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
				var newAssignedTags = Session.get("assignedTags") || [];
				newAssignedTags.push(data);
				Session.set("assignedTags", newAssignedTags);
				$(".tag-input").val('');
			}
		}
	},

	saveDream: function(callBack){
		Meteor.call("saveDream", 
			{
				text:Session.get("dreamText"), 
				mood: Session.get("selectedFace"), 
				assignedTags: Session.get("assignedTags")
			}, createDreamCallBack);

		function createDreamCallBack(error, data){
			console.log("error: "+error),
			console.log("data: "+data);
		}
	},

	analizeText: function(){
		var text = Session.get("dreamText");

		var words = text.split(" ");

		for (var i = 0; i < words.length; i++) {
			if(words[i].length > 4){
				//TODO: Get possible tags
			}
		};
	}
}