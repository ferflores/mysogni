Meteor.startup(function(){
	Tags._ensureIndex({text:1});
	Tags._ensureIndex({userId:1});
	UserTags._ensureIndex({userId:1});
	TagCategories._ensureIndex({value:1});

	if (TagCategories.find({}).fetch().length < 1){
		TagCategories.insert({
			'value':-1,
			'es':'Categoría de etiqueta',
			'en': 'Tag category'
		});

		TagCategories.insert({
			'value':0,
			'es':'General',
			'en': 'General'
		});
		TagCategories.insert({
			'value':1,
			'es':'Familia',
			'en': 'Family'
		});
		TagCategories.insert({
			'value':2,
			'es':'Amigos',
			'en': 'Friends'
		});
		TagCategories.insert({
			'value':3,
			'es':'Amor',
			'en': 'Love'
		});
		TagCategories.insert({
			'value':4,
			'es':'Animales',
			'en': 'Animals'
		});
		TagCategories.insert({
			'value':5,
			'es':'Lugares',
			'en': 'Places'
		});
		TagCategories.insert({
			'value':6,
			'es':'Otro',
			'en': 'Other'
		});
	}
});