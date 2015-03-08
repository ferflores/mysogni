Meteor.methods({
	'getRandomMessage': function(){
		if(Meteor.userId()){
			var array = WelcomeMsgs.find().fetch();
			var randomIndex = Math.floor( Math.random() * array.length );
			var element = array[randomIndex];
			return element;
		}

		return "";
	}
});