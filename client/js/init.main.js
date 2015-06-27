Meteor.startup(function () {
	if(Cookie.get('lang')){
		Meteor.I18n().lang(Cookie.get('lang'));
	}
});