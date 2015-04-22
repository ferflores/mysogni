Template.faces.rendered = function(){

	if(Session.get("dreamText")){
		$('#mainContent').velocity('transition.fadeIn', 1000);

	}else{
		Router.go("home");
	}
}

Template.faces.events({
	'click .face': function(event){
		Session.set('selectedFace', this);
		Router.go('tags');
	}
});

Template.faces.helpers({
	faces: function(){
		return Template.faces.Utils.getFaces();
	}
});

Template.faces.Utils = {
	'getFaces': function(){
		return [
			{file:"happy.png", value:0},
			{file:"sad.png", value:1},
			{file:"angry.png", value:2},
			{file:"scared.png", value:3},
		];
	}
};
