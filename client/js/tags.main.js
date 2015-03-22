Template.tags.rendered = function(){
	Meteor.subscribe("userTags");

	if(!Session.get("assignedTags")){
		Session.set("assignedTags", []);
	}

	if(Session.get("dreamText")){
		$('#mainContent').velocity('transition.fadeIn', 1000);
		Template.tags.Utils.analizeText();
	}else{
		Router.go("home");
	}
}

Template.tags.events({
	"click .create-tag": function(){
		Template.tags.Utils.createTag(Template.tags.callBacks.createTagCallBack);
	},

	"keypress .tag-input": function(event){
		if((event.which && event.which == 13) || (event.keyCode && event.keyCode == 13)){
			Template.tags.Utils.createTag(Template.tags.callBacks.createTagCallBack);
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
		Session.set("availableUserTags", Tags.find({userId:Meteor.userId()}, {limit:1}).count() > 0);
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
	}
});

Template.tags.Utils = {
	createTag: function(callBack){
		Session.set("createTagError","");
		var tagText = $(".tag-input").val();

		if(tagText.length < 1){
			Session.set("createTagError","Escribe el nombre de la etiqueta");
		}else if(tagText.replace(/^[A-Za-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
			Session.set("createTagError","Solo números y letras por favor");
		}else{
			Session.set("creatingTag", true);
			Meteor.call("createTag", {text:tagText}, createTagCallBack);
		}

		function createTagCallBack(error, data){
			Session.set("creatingTag", false);
			if(error){
				Session.set("createTagError","Error al crear etiqueta");
			}else{
				$(".tag-input").val('');
			}
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

Template.tags.callBacks = {
	createTagCallBack: function(success, error){
		console.log("tag created");
	}
}