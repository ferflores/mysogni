Meteor.methods({
	'isFirstLogin': function(){
		if(this.userId){
			var firstLogin = Meteor.users.findOne({_id:this.userId}).firstLogin;

			if(firstLogin){
				Meteor.users.update({_id:this.userId},{$set:{firstLogin:false}});
			}

			return true;
		}

		return false;
	}
});