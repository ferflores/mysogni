WelcomeMsgs = new Mongo.Collection("welcomeMessages");

if(Meteor.isServer){ //TODO: move this to server folder

	WelcomeMsgs.allow({
		insert: function (userId, welcomeMsg) {
			return false;
		},
		update:function(userId, doc){
			return false;
		},
        remove: function(userId, doc) {
            return false;
        }
	});
}