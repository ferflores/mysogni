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
		return DreamMoods.find({active:true}, {limit: 50});
	}
});

Meteor.publish("dreamDateOptions", function(){
	if(this.userId){
		return DreamDateOptions.find({}, {limit: 50});
	}
});

Meteor.publish("dreams", function(limit){
	if(this.userId){

		if(!limit){
			limit=30;
		}

		if(limit > 10000){
			limit = 10000;
		}

		return Dreams.find({$and:[{userId:this.userId}, {deleted:false}]}, 
			{limit: limit, sort:{'createdOn':-1}});
	}
});