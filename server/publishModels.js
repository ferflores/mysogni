Meteor.publish("userTags", function(){
	if(this.userId){
		return UserTags.find({userId:this.userId});
	}
});

Meteor.publish("tagCategories", function(){
	if(this.userId){
		return TagCategories.find({}, {limit:50});
	}
});

Meteor.publish("dreamMoods", function(){
	if(this.userId){
		return DreamMoods.find({}, {limit: 50});
	}
});

Meteor.publish("dreams", function(limit){
	if(this.userId){
		if(limit > 10000){
			limit = 10000;
		}
		return Dreams.find({userId:this.userId}, {limit: limit, sort:{'createdOn':-1}});
	}
});