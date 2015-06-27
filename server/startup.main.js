Meteor.startup(function(){
	Tags._ensureIndex({text:1});
	Tags._ensureIndex({userId:1});
	UserTags._ensureIndex({userId:1}, {unique: true, dropDups: true})
	TagCategories._ensureIndex({value:1}, {unique: true, dropDups: true});
	DreamMoods._ensureIndex({value: 1}, {unique: true, dropDups: true});
	Dreams._ensureIndex({userId:1, createdOn:1});
	Dreams._ensureIndex({deleted:1});

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
	};

	if(DreamMoods.find({}).fetch().length < 1){
		DreamMoods.insert({
			file:"happy.png",
			value: 0,
			stringValue: "happy"
		});

		DreamMoods.insert({
			file:"sad.png",
			value: 1,
			stringValue: "sad"
		});

		DreamMoods.insert({
			file:"angry.png",
			value: 2,
			stringValue: "angry"
		});

		DreamMoods.insert({
			file:"scared.png",
			value: 3,
			stringValue: "scared"
		});
	}
});