Meteor.startup(function () {
    if(Cookie.get('lang')){
		Meteor.I18n().lang(Cookie.get('lang'));
	}else{
		Meteor.I18n().lang("es");
	}
});


Template.home.rendered = function(){
	
	Meteor.subscribe("wMessages");

	$('#mainContent').velocity('transition.fadeIn',1000);

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
	}
});