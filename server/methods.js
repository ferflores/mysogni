Meteor.methods({
	'getRandomMessage': function(){
		if(Meteor.userId()){
			var array = WelcomeMsgs.find().fetch();
			var randomIndex = Math.floor( Math.random() * array.length );
			var element = array[randomIndex];
			return element;
		}

		return "";
	},

	'createTag' : function(tag){

		if(Meteor.userId()){

			tag.text = Meteor.ValidationUtils.cleanTag(tag.text);

			if(tag.text.length < 1 || tag.text.replace(/^[a-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
				return {error: "INV_CHAR"};
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
	}
});

Meteor.ValidationUtils = {
	cleanTag: function(tagText){
		return tagText.replace(/\s+/g," ")
	}
};