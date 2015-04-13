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