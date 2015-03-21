Meteor.publish("userTags", function(){
	if(this.userId){
		return Tags.find({userId:this.userId});
	}
});