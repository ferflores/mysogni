Meteor.startup(function(){
	Tags._ensureIndex({text:1});
	Tags._ensureIndex({userId:1});

	if (TagCategories.find({}).fetch().length < 1){
		TagCategories.insert({
			'es':'General',
			'en': 'General'
		});
		TagCategories.insert({
			'es':'Familia',
			'en': 'Family'
		});
		TagCategories.insert({
			'es':'Amigos',
			'en': 'Friends'
		});
		TagCategories.insert({
			'es':'Amor',
			'en': 'Love'
		});
		TagCategories.insert({
			'es':'Animales',
			'en': 'Animals'
		});
		TagCategories.insert({
			'es':'Lugares',
			'en': 'Places'
		});
		TagCategories.insert({
			'es':'Otro',
			'en': 'Other'
		});
	}
});