var checkTranslations = function(){
	var translations = [
	  {lang: 'es', base_str: 'Salir', new_str: 'Salir'},
	  {lang: 'en', base_str: 'Salir', new_str: 'Logout'},
	  {lang: 'es', base_str: 'Inicia sesión con facebook', new_str: 'Inicia sesión con facebook'},
	  {lang: 'en', base_str: 'Inicia sesión con facebook', new_str: 'Login with facebook'},
	  {lang: 'en', base_str: 'Switch to english', new_str: 'Cambiar a español'},
	  {lang: 'es', base_str: 'Switch to english', new_str: 'Switch to english'},
	  {lang: 'es', base_str: 'Comienza a estudiar tus sueños', new_str: 'Comienza a estudiar tus sueños'},
	  {lang: 'en', base_str: 'Comienza a estudiar tus sueños', new_str: 'Start researching your dreams'},
	  {lang: 'es', base_str: 'Mis sueños', new_str: 'Mis sueños'},
	  {lang: 'en', base_str: 'Mis sueños', new_str: 'My dreams'},
	  {lang: 'es', base_str: '¿Qué soñaste?', new_str: '¿Qué soñaste?'},
	  {lang: 'en', base_str: 'Mis sueños', new_str: 'What did you dream?'},
	  {lang: 'es', base_str: 'Escribe aquí tu sueño', new_str: 'Escribe aquí tu sueño'},
	  {lang: 'en', base_str: 'Escribe aquí tu sueño', new_str: 'Write your dream'},
	  {lang: 'es', base_str: 'Siguiente', new_str: 'Siguiente'},
	  {lang: 'en', base_str: 'Siguiente', new_str: 'Next'},
	  {lang: 'es', base_str: 'Elige el humor de tu sueño', new_str: 'Elige el humor de tu sueño'},
	  {lang: 'en', base_str: 'Elige el humor de tu sueño', new_str: 'Choose your dream mood'},
	  {lang: 'es', base_str: 'Etiquetas', new_str: 'Etiquetas'},
	  {lang: 'en', base_str: 'Etiquetas', new_str: 'Dream tags'},
	  {lang: 'es', base_str: 'Clasifica tus sueños con etiquetas', new_str: 'Clasifica tus sueños con etiquetas, por ejemplo: agua, perros, familia...'},
	  {lang: 'en', base_str: 'Clasifica tus sueños con etiquetas', new_str: 'Clasify your dreams with tags like: water, dogs, family...'},
	  {lang: 'es', base_str: 'Tu sueño', new_str: 'Tu sueño'},
	  {lang: 'en', base_str: 'Tu sueño', new_str: 'Your dream'},
	  {lang: 'es', base_str: 'Editar', new_str: 'Editar'},
	  {lang: 'en', base_str: 'Editar', new_str: 'Edit'},
	  {lang: 'es', base_str: 'Escribe aquí para crear una etiqueta', new_str: 'Escribe aquí para crear una nueva etiqueta'},
	  {lang: 'en', base_str: 'Escribe aquí para crear una etiqueta', new_str: 'Write here to create a new tag'},
	  {lang: 'es', base_str: 'Crear etiqueta', new_str: 'Crear etiqueta'},
	  {lang: 'en', base_str: 'Crear etiqueta', new_str: 'Create tag'},
	  {lang: 'es', base_str: 'Guardar sueño', new_str: 'Guardar sueño'},
	  {lang: 'en', base_str: 'Guardar sueño', new_str: 'Save dream'},
	  {lang: 'es', base_str: 'Asigna tus etiquetas', new_str: 'Asigna tus etiquetas'},
	  {lang: 'en', base_str: 'Asigna tus etiquetas', new_str: 'Assign your tags'},
	  {lang: 'es', base_str: 'Buscar etiqueta', new_str: 'Buscar etiqueta'},
	  {lang: 'en', base_str: 'Buscar etiqueta', new_str: 'Search tag'},
	  {lang: 'es', base_str: 'Aun no has guardado sueños :(', new_str: 'Aun no has guardado sueños :('},
	  {lang: 'en', base_str: 'Aun no has guardado sueños :(', new_str: 'You have not saved dreams yet'},
	  {lang: 'es', base_str: 'Tu sueño ha sido guardado :)', new_str: 'Tu sueño ha sido guardado :)'},
	  {lang: 'en', base_str: 'Tu sueño ha sido guardado :)', new_str: 'Your dream has been saved :)'},
	  {lang: 'es', base_str: 'Ver más', new_str: 'Ver más'},
	  {lang: 'en', base_str: 'Ver más', new_str: 'Show more'},
	  {lang: 'es', base_str: 'Volver', new_str: 'Volver'},
	  {lang: 'en', base_str: 'Volver', new_str: 'Back'},
	  {lang: 'es', base_str: 'Editar texto', new_str: 'Editar texto'},
	  {lang: 'en', base_str: 'Editar texto', new_str: 'Edit text'},
	  {lang: 'es', base_str: 'Editar humor', new_str: 'Editar humor'},
	  {lang: 'en', base_str: 'Editar humor', new_str: 'Edit mood'},
	  {lang: 'es', base_str: 'Editar etiquetas', new_str: 'Editar etiquetas'},
	  {lang: 'en', base_str: 'Editar etiquetas', new_str: 'Edit tags'},
	  {lang: 'es', base_str: 'Borrar sueño', new_str: 'Borrar sueño'},
	  {lang: 'en', base_str: 'Borrar sueño', new_str: 'Delete dream'},
	  {lang: 'es', base_str: 'Cancelar edición', new_str: 'Cancelar edición'},
	  {lang: 'en', base_str: 'Cancelar edición', new_str: 'Cancel edit'},
	  {lang: 'es', base_str: 'Guardar', new_str: 'Guardar'},
	  {lang: 'en', base_str: 'Guardar', new_str: 'Save'}
	];
	var i18n = Meteor.I18n();

	for (var i in translations) {
	  if (!i18n.collection.findOne({lang: translations[i].lang, base_str: translations[i].base_str})) {
	    i18n.insert(translations[i].lang, translations[i].base_str, translations[i].new_str);
	  }
	}
}

checkTranslations();