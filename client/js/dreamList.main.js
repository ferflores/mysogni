Template.dreamList.rendered = function(){

	Session.setDefault('dreamsLimit', 5);
	Meteor.subscribe("dreams", Session.get('dreamsLimit'));

	$('#mainContent').velocity('transition.fadeIn', 1000);

	$(window).scroll(Template.dreamList.utils.showMoreDreams);
}

Template.dreamList.helpers({
	"isNewDream": function(){
		return Router.current().params.query.new;
	},

	"dreams": function(){
		return Dreams.find({},{sort:{createdOn:-1}});
	},
	"moreResults": function(){
		return !(Dreams.find().count() < Session.get("dreamsLimit"));
	}
});

Template.dreamList.utils = {
	showMoreDreams: function() {
	    var threshold, target = $("#showMoreResults");
	    if (!target.length) return;
	 
	    threshold = $(window).scrollTop() + $(window).height() - target.height();
	 
	    if (target.offset().top < threshold) {
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
	}
}