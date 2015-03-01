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
            	Router.go('home');
            }
        });
    },
});

Template.login.helpers({
	strings: function(){
		return {
				loginError: function(){
					return Session.get('loginError');
				},
				chooseLanguageText: function(){
					return Meteor.I18n().t("Comienza a estudiar tus sueños");
				},
				switchLanguageText: function(){
					return Meteor.I18n().t("Cambiar lenguaje");
				},
				loginFacebookText: function(){
					return Meteor.I18n().t("Inicia sesión con facebook");
				}
			}
	}
});


Template.login.rendered = function(){
	if(Cookie.get('lang')){
		Meteor.I18n().lang(Cookie.get('lang'));
	}else{
		Meteor.I18n().lang("es");
	}

	if(Meteor.user()){
		Router.go('home');
	}
}