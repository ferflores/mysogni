Template.home.events({
	"click .save-dream": function(event){
		if(!Session.get("dreamText") || Session.get("dreamText").length < 1){
			//Empty error
		}else{
			FlowRouter.go("/faces");
		}
	},
	"keyup .dream-input": function(event){
		Session.setPersistent("dreamText", event.target.value);
	}
});

Template.home.rendered = function(){

	if(!Meteor.userId()){
		FlowRouter.go("/login");
	}
	
	Meteor.subscribe("wMessages");

}

Template.home.helpers({
	'randomMessage': function(){

		Meteor.call('getRandomMessage', "", randomMessageLoaded);

		function randomMessageLoaded(error, message){
			if(error){
				$("#randomMessage").hide();
			}else{
				$("#randomMessage").show();
				var text = message[Meteor.I18n().lang()]
				$("#randomMessageText").text(text);
			}
		}
	},

	'disabledSaveDream': function(){
		return Session.get("dreamText") ? "" : "disabled";
	},

	'dreamText': function(){
		return Session.get("dreamText");
	}
});