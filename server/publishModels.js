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