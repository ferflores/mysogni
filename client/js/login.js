Template.login.events({
	"click .switch-language": function(event){
		if(Meteor.I18n().lang() == "es"){
			Meteor.I18n().lang("en");
		}else{
			Meteor.I18n().lang("es");
		}

		Cookie.set('lang', Meteor.I18n().lang());
	},
	"click .fb-login": function(event) {
		
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                Session.set("loginError","Facebook login error");
            }else{
            	FlowRouter.go('/');
            }
        });
    },
});

Template.login.helpers({
	strings: function(){
		return {
				loginError: function(){
					return Session.get('loginError');
				}
			}
	}
});


Template.login.rendered = function(){
	if(Meteor.userId()){
		FlowRouter.go('/');
	}
}