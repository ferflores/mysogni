Meteor.methods({
	'getRandomMessage': function(){
		if(this.userId){
			var array = WelcomeMsgs.find().fetch();
			var randomIndex = Math.floor( Math.random() * array.length );
			var element = array[randomIndex];
			return element;
		}

		return "";
	},

	'createTag' : function(tag){

		if(this.userId){

			tag.text = Meteor.ValidationUtils.cleanTag(tag.text);

			if(tag.text.length < 1 || tag.text.replace(/^[a-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
				return {error: "INV_CHAR"};
			}

			if(tag.text.length > 15){
				return {error: "MAX_LENGTH"}
			}

			var existingTag = Tags.findOne({text:tag.text.toLowerCase()});

			if(!existingTag){
				var newTag = {
					userId:Meteor.userId(),
					text:tag.text.toLowerCase(),
					createdOn: new Date()
				};
				
				Tags.insert(newTag);

				return newTag;
			}

			return existingTag;
		}

		throw new Error("Not authorized");
	},

	'getUserTagCount': function(){
		if(this.userId){

			var count = Tags.find({userId:this.userId}).count();

			return count;
		}

		throw new Error("Not authorized");
	},

	'searchTag': function(request){
		if(this.userId){
			var tags = Tags.find({text:{'$regex':request.text},
				_id:{$nin:request.assignedTags}}, {limit:3}).fetch();
			return tags;
		}
	}
});

Meteor.ValidationUtils = {
	cleanTag: function(tagText){
		return tagText.replace(/\s+/g," ").substring(0,20);
	}
};