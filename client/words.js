Template.login.helpers({
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
});
	