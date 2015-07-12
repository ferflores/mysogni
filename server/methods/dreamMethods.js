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

			Dreams.insert({
				userId:this.userId,
				text:dreamText,
				mood:{moodId:dreamMood.value, file:dreamMood.file},
				tags:assignedTags,
				createdOn: new Date(),
				dreamedOn: null,
				deleted: false
			});

			return 1;
		}

		throw new Error("Not authorized");
	},

	'updateDreamText': function(dreamData){
		if(!this.userId){
			throw new Error("Not authorized");
		}

		if(!dreamData.text || dreamData.text.length < 1){
			throw new Error("Empty dream text: " + dreamData.dreamId);
		}

		Dreams.update({$and:[{_id:dreamData.dreamId}, {userId:this.userId}]},
			{$set:{text:dreamData.text}});
	},

	'updateDreamMood': function(dreamData){
		if(!this.userId){
			throw new Error("Not authorized");
		}

		if(!dreamData.dreamMoodId){
			throw new Error("Empty dream mood: " + dreamData.dreamId);
		}

		var newDreamMood = DreamMoods.findOne({_id:dreamData.dreamMoodId});
		if(!newDreamMood){
			throw new Error("Invalid dream mood "+ dreamMood._id);
		}

		Dreams.update({$and:[{_id:dreamData.dreamId}, {userId:this.userId}]},
			{$set:{mood:newDreamMood}});
	},

	'deleteDream':function(dreamId){
		if(!this.userId){
			throw new Error("Not authorized");
		}

		var dreamExists = Dreams.findOne({_id:dreamId}) != null;
		if(dreamExists){
			Dreams.update({_id:dreamId}, {$set:{deleted:true}});
		}
	}
});

