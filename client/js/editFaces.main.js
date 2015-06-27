Template.editFaces.rendered = function(){

	if(!Session.get('editFace')){
		Router.go('home');
	}

	Meteor.subscribe("dreamMoods");

}

Template.editFaces.helpers({
	faces: function(){
		return DreamMoods.find({});
	},
	'error': function(){
		return Session.get("editDreamMoodError");
	}
});

Template.editFaces.events({
	'click .face': function(event){

		var dream = Session.get("editFace");
		var mood = this;

		Meteor.call("updateDreamMood",{dreamId:dream._id, dreamMoodId: this._id }, updateDreamMoodCallback);

		function updateDreamMoodCallback(err){
			if(err){
				Session.set("editDreamMoodError", "Error al intentar actualizar sueño");
			}else{
				Session.set("editDreamMoodError", null);
				var viewDream = Session.get("viewDream");
				viewDream.mood = mood;
				Session.set("viewDream", viewDream);
				Router.go("viewDream");
			}
		}
	},
	'click .cancel-edit': function(){
		Router.go('viewDream');
	}

});