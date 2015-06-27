Template.faces.onCreated(function(){
	if(!Session.get("dreamText")){
		Router.go("home");
	}
});

Template.faces.rendered = function(){
	Meteor.subscribe("dreamMoods");

}

Template.faces.events({
	'click .face': function(event){
		Session.set('selectedFace', this);
		Router.go('tags');
	}
});

Template.faces.helpers({
	faces: function(){
		return DreamMoods.find({});
	}
});
