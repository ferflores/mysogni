Meteor.methods({
	'saveDream' : function(dream){
		if(this.userId){
			
			var dreamText = dream.text;
			var dreamMood = dream.mood;
			var assignedTags = dream.assignedTags;

			if(!dreamText || dreamText.length < 1){
				throw new Error("No dream length");
			}

			if(!dreamMood || !dreamMood._id){
				throw new Error("Dream mood required");
			}

			if(!DreamMoods.findOne({_id:dreamMood._id})){
				throw new Error("Invalid dream mood "+ dreamMood._id);
			}

			if(assignedTags && assignedTags.length > 0){

				var existingUserTags = UserTags.findOne({userId:this.userId});
				if(!existingUserTags){
					throw new Error("No user tags found at saveDream, userId: " + this.userId);
				}

				for (var i = 0; i < assignedTags.length; i++) {
					var validTag = false;
					for (var j = 0; j < existingUserTags.tags.length; j++) {
						if(assignedTags[i]._id === existingUserTags.tags[j]._id){
							validTag = true;
							continue;
						}
					};

					if(!validTag){
						throw new Error("Invalid tag, userId: " + this.userId + " tagId: "+ assignedTags[i]._id);
					}
				}

			}else{
				assignedTags = [];
			}

			var tagIds = [];
			for (var i = 0; i < assignedTags.length; i++) {
				tagIds.push(assignedTags[i]._id);
			};

			Dreams.insert({
				userId:this.userId,
				text:dreamText,
				mood:{moodId:dreamMood.value, fileName:dreamMood.file},
				tags:tagIds,
				createdOn: new Date(),
				dreamedOn: null
			});

			return 1;
		}

		throw new Error("Not authorized");
	}
});

