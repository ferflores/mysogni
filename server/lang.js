var checkTranslations = function(){
	var translations = [
	  {lang: 'es', base_str: 'Salir', new_str: 'Salir'},
	  {lang: 'en', base_str: 'Salir', new_str: 'Logout'},
	  {lang: 'es', base_str: 'Inicia sesión con facebook', new_str: 'Inicia sesión con facebook'},
	  {lang: 'en', base_str: 'Inicia sesión con facebook', new_str: 'Login with facebook'},
	  {lang: 'en', base_str: 'Cambiar lenguaje', new_str: 'Cambiar a español'},
	  {lang: 'es', base_str: 'Cambiar lenguaje', new_str: 'Switch to english'},
	  {lang: 'es', base_str: 'Comienza a estudiar tus sueños', new_str: 'Comienza a estudiar tus sueños'},
	  {lang: 'en', base_str: 'Comienza a estudiar tus sueños', new_str: 'Start researching your dreams'}
	];
	var i18n = Meteor.I18n();

	for (var i in translations) {
	  if (!i18n.collection.findOne({lang: translations[i].lang, base_str: translations[i].base_str})) {
	    i18n.insert(translations[i].lang, translations[i].base_str, translations[i].new_str);
	  }
	}
}

checkTranslations();