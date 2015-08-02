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
			if(assignedTags && assignedTags.length > 0 && assignedTags.length < 50){

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
	},

	'updateDreamTags': function(data){
		if(this.userId){
			var dream = Dreams.findOne({_id: data.dreamId});

			if(!dream){
				throw new Error("no dream");
			}

			var assignedTags = data.assignedTags;

			if(assignedTags){

				if(assignedTags.length > 50){
					throw new Error("Max assigned tags exeeded");
				}

				assignedTags = _.uniq(assignedTags, function(item, key, a) { 
    					return item.text.toLowerCase();
					});

				if(assignedTags && assignedTags.length > 0 && assignedTags.length < 50){

					assignedTags = Meteor.dreamMethodsUtils.validateAndUpdateUserTags(this.userId, assignedTags);
				}else{
					assignedTags = [];
				}

				Dreams.update({_id:dream._id},{$set:{tags:assignedTags}});
			}

			return 1;
		}

		throw new Error("Not authorized");
	}
});

Meteor.dreamMethodsUtils = {
	"validateAndUpdateUserTags": function(userId, assignedTags){

		var userTags = UserTags.findOne({userId:userId});
		var userTagsId = null;
		var newTags = [];
		var validTags = [];

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

			var existingTag = false;

			for (var j = 0; j < userTags.tags.length; j++) {
				if(assignedTags[i].text.toLowerCase() 
					== userTags.tags[j].text.toLowerCase()){
					existingTag = true;
					break;
				}
			};

			if(!existingTag){
				UserTags.update({_id:userTagsId}, 
					{$push:{tags: {text:assignedTags[i].text, addedOn:new Date()}}});
			}

			validTags.push({text:assignedTags[i].text, addedOn: new Date()});
		};

		return validTags;

	}
}
