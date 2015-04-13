Meteor.methods({
	'getRandomMessage': function(){
		if(this.userId){
			var array = WelcomeMsgs.find().fetch();
			var randomIndex = Math.floor( Math.random() * array.length );
			var element = array[randomIndex];
			return element;
		}

		return "";
	}
});