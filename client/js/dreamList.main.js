Template.dreamList.rendered = function(){

	Template.dreamList.utils.currentLimit = 5; 
	
	Meteor.subscribe("dreams", Template.dreamList.utils.currentLimit);

	console.log(Template.dreamList.utils.currentLimit);
}

Template.dreamList.events({
	"click .more-button": function(){
		Template.dreamList.utils.showMoreDreams();
	},
	"click .dream-div": function(){
		Session.set("viewDream", this);
		FlowRouter.go("/viewDream");
	},
	"keyup .search-dream": function(){
		if($(".search-dream").val().length < 20){
			Session.set("dreamTextSearch", $(".search-dream").val());
		}
	}
});

Template.dreamList.helpers({
	"isNewDream": function(){
		return FlowRouter.getQueryParam('new');
	},

	"dreams": function(){
		var textSearch = Session.get("dreamTextSearch") || "";
		return Dreams.find({text:new RegExp(textSearch)}, {sort:{'createdOn':-1}});
	},
	"moreResults": function(){
		return (Dreams.find({}).count() < Counts.get('dreamsCount'));
	},
	"noDreams": function(){
		return Dreams.find({}).fetch().length < 1;
	}
});

Template.dreamList.utils = {
	showMoreDreams: function() {

		Template.dreamList.utils.currentLimit += 5;

		Meteor.subscribe("dreams", Template.dreamList.utils.currentLimit);
	},

	currentLimit: 5
}

Template.dreamList.onDestroyed(function(){
	Template.dreamList.utils.currentLimit = 5;
	Session.set("dreamTextSearch", null);
});