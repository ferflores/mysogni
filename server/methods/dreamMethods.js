Meteor.methods({
	'saveDream' : function(dream){
		if(this.userId){
			var dreamText = dream.text;
			var dreamMood = dream.mood;
			var assignedTags = dream.assignedTags || [];

			if(!dreamText || dreamText.length < 1){
				throw new Error("No dream length");
			}

			if(!dreamMood || !dreamMood._id){
				throw new Error("Dream mood required");
			}

			if(!DreamMoods.findOne({_id:dreamMood._id})){
				throw new Error("Invalid dream mood "+ dreamMood._id);
			}

			//TODO: Display a max tags error instead of do nothing
			if(assignedTags && assignedTags.length > 0 && assignedTags.length < 21){

				assignedTags = Meteor.dreamMethodsUtils.validateAndUpdateUserTags(this.userId, assignedTags);

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

Meteor.dreamMethodsUtils = {
	"validateAndUpdateUserTags": function(userId, assignedTags){

		var userTags = UserTags.findOne({userId:userId});
		var userTagsId = null;
		var dreamTags = [];

		if(!userTags){
			userTags = {
				userId: userId,
				tags: [],
				updatedOn: new Date()
			}
			userTagsId = UserTags.insert(userTags);
		}else{
			userTagsId = userTags._id;
		}

		for (var i = 0; i < assignedTags.length; i++) {
			var text = assignedTags[i].text;

			if(!text){
				continue;
			}

			text = text.replace(/\s+/g);

			if(text.length < 1){
				continue;
			}

			if(text.replace(/^[a-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
				continue;
			}

			dreamTags.push({text:text});

			var existingTag = false;
			for (var j = 0; j < userTags.length; j++) {
				assignedTags[i].text == userTags.text;
			};

			if(!existingTag){
				UserTags.update({_id:userTagsId}, {$push:{tags:existingTag}});
			}
		};

		return dreamTags;
	}
}