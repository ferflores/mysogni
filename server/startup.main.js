Meteor.startup(function(){
	UserTags._ensureIndex({userId:1}, {unique: true, dropDups: true});
	TagCategories._ensureIndex({value:1}, {unique: true, dropDups: true});
	DreamMoods._ensureIndex({value: 1}, {unique: true, dropDups: true});
	Dreams._ensureIndex({userId:1});
	Dreams._ensureIndex({createdOn:-1});
	Dreams._ensureIndex({dreamedOn:-1});
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
			stringValue: "happy",
			active:true
		});

		DreamMoods.insert({
			file:"verysad.png",
			value: 1,
			stringValue: "sad",
			active:true
		});

		DreamMoods.insert({
			file:"mad.png",
			value: 2,
			stringValue: "mad",
			active:true
		});

		DreamMoods.insert({
			file:"scared.png",
			value: 3,
			stringValue: "scared",
			active:true
		});

		DreamMoods.insert({
			file:"excited.png",
			value: 4,
			stringValue: "excited",
			active:true
		});

		DreamMoods.insert({
			file:"fun.png",
			value: 5,
			stringValue: "fun",
			active:true
		});

		DreamMoods.insert({
			file:"inlove.png",
			value: 6,
			stringValue: "inlove",
			active:true
		});

		DreamMoods.insert({
			file:"nostalgic.png",
			value: 7,
			stringValue: "nostalgic",
			active: false
		});

		DreamMoods.insert({
			file:"confused.png",
			value: 8,
			stringValue: "confused",
			active:true
		});

		DreamMoods.insert({
			file:"noemotion.png",
			value: 9,
			stringValue: "noemotion",
			active:true
		});

		DreamMoods.insert({
			file:"impressed.png",
			value: 10,
			stringValue: "impressed",
			active:true
		});
	}

	if(DreamDateOptions.find({}).count() < 1){

		DreamDateOptions.insert({
			value: 0,
			stringValue: "Hoy",
			relative:false
		});

		DreamDateOptions.insert({
			value: 1,
			stringValue: "Ayer",
			relative:false
		});

		DreamDateOptions.insert({
			value: 2,
			stringValue: "Fecha específica",
			relative:false
		});

		DreamDateOptions.insert({
			value: 3,
			stringValue: "Semana pasada",
			relative:false
		});

		DreamDateOptions.insert({
			value: 4,
			stringValue: "Hace meses",
			relative:true
		});

		DreamDateOptions.insert({
			value: 5,
			stringValue: "Hace pocos años",
			relative:true
		});

		DreamDateOptions.insert({
			value: 6,
			stringValue: "Hace muchos años",
			relative:true
		});
	}
});

/*smtp = {
    username: 'mysogni@ferflores.net',   // eg: server@gentlenode.com
    password: '',   // eg: 3eeP1gtizk5eziohfervU
    server:   '',  // eg: mail.gandi.net
    port: 25
  }*/

 // process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
