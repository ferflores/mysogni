Template.dreamList.rendered = function(){

	Session.setDefault('dreamsLimit', 5);
	

	Template.dreamList.utils.autorunHandler = Deps.autorun(function() {
    	Meteor.subscribe("dreams", Session.get('dreamsLimit'));
  	});

	$(window).scroll(Template.dreamList.utils.showMoreDreams);
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
		return Dreams.find({text:new RegExp(textSearch)});
	},
	"moreResults": function(){
		return !(Dreams.find({}).count() < Session.get("dreamsLimit"));
	},
	"noDreams": function(){
		return Dreams.find({}).fetch().length < 1;
	}
});

Template.dreamList.utils = {
	showMoreDreams: function() {
	    var threshold, target = $("#showMoreResults");
	    if (!target.length) return;
	 
	    threshold = $(window).scrollTop() + $(window).height() - target.height();

	    if (target.offset().top <= threshold+10) {
	        if (!target.data("visible")) {
	            target.data("visible", true);
	            Session.set("dreamsLimit",
	                Session.get("dreamsLimit") + 5);
	        }
	    } else {
	        if (target.data("visible")) {
	            target.data("visible", false);
	        }
	    }
	},

	autorunHandler: null
}

Template.dreamList.onDestroyed(function(){
	if(Template.dreamList.utils.autorunHandler){
		Template.dreamList.utils.autorunHandler.stop();
		$(window).scroll(function(){});
	}

	Session.set("dreamTextSearch", null);
});