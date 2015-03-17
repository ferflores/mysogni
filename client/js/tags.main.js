Template.tags.rendered = function(){

	if(Session.get("dreamText")){
		$('#mainContent').velocity('transition.fadeIn', 1000);
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
	}
});

Template.tags.helpers({
	"createTagError": function(){
		return Session.get("createTagError");
	},

	"creatingTag": function(){
		return Session.get("creatingTag");
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

			}
		}
	}
}

Template.tags.callBacks = {
	createTagCallBack: function(success, error){
		console.log("tag created");
	}
}