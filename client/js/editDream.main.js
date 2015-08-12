Template.editDream.rendered = function(){

	if(!Session.get('editDream')){
		FlowRouter.go('/');
	}

	$('#mainContent').velocity('transition.fadeIn', 1000);

}

Template.editDream.helpers({
	"editDream": function(){
		return Session.get('editDream');
	},
	'disabledSaveDream': function(){
		if(!Session.get("editDream")){
			return "";
		}

		return Session.get("editDream").text ? "" : "disabled";
	},
	'error': function(){
		return Session.get("editDreamTextError");
	}
});

Template.editDream.events({
	"keyup .dream-input": function(event){
		var dream = Session.get("editDream");
		dream.text = event.target.value;
		Session.set("editDream", dream);
	},
	"click .cancel-edit":function(){
		FlowRouter.go("/viewDream");
	},
	"click .save-dream-text": function(event){
		if(!Session.get("editDream").text || Session.get("editDream").text.length < 1){
			//Empty error
		}else{
			var dream = Session.get("editDream");
			Meteor.call("updateDreamText",{dreamId:dream._id, text: dream.text }, updateDreamTextCallback);
		}	

		function updateDreamTextCallback(err){
			if(err){
				Session.set("editDreamTextError", "Error al intentar actualizar sueño");
			}else{
				Session.set("editDreamTextError", null);
				var viewDream = Session.get("viewDream");
				viewDream.text = Session.get('editDream').text;
				Session.set("viewDream", viewDream);
				
				FlowRouter.go("/viewDream");
			}
		}
	}
});