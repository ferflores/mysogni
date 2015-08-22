Template.faces.onCreated(function(){
	if(!Session.get("dreamText")){
		FlowRouter.go("/");
		return;
	}
});

Template.faces.rendered = function(){
	Meteor.subscribe("dreamMoods");

}

Template.faces.events({
	'click .face': function(event){
		Session.set('selectedFace', this);
		FlowRouter.go('/tags');
	}
});

Template.faces.helpers({
	faces: function(){
		return DreamMoods.find({});
	}
});
