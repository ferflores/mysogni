Meteor.methods({
	'createTag' : function(tag){

		if(this.userId){

			tag.text = Meteor.ValidationUtils.cleanTag(tag.text);

			if(tag.text.length < 1 || tag.text.replace(/^[a-z0-9-_\sáéíóúÁÉÍÓÚ]+$/g,"").length > 0){
				return {error: "INV_CHAR"};
			}

			if(tag.text.length > 15){
				return {error: "MAX_LENGTH"}
			}

			var tagId = "";
			var existingTag = Tags.findOne({text:tag.text.toLowerCase()});

			if(!existingTag){
				newTag = {
					createdBy:this.userId,
					text:tag.text.toLowerCase(),
					createdOn: new Date()
				};
				
				tagId = Tags.insert(newTag);
			}else{
				tagId = existingTag._id;
			}

			return Meteor.tagMethodsUtils.createUserTag(tagId, tag);
		}

		throw new Error("Not authorized");
	},

	'updateDreamTags': function(data){
		if(this.userId){
			var dream = Dreams.findOne({_id: data.dreamId});
			var assignedTags = data.assignedTags;

			if(assignedTags && assignedTags.length > 0){
				if(assignedTags.length > 100){
					throw new Error("Max assigned tags exeeded");
				}

				

				assignedTags = _.uniq(assignedTags, function(item, key, a) { 
    					return item._id;
					});

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

			Dreams.update({_id:dream._id},{$set:{tags:assignedTags}});

			return 1;
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

	'getThreeRandomTags': function(request){
		if(this.userId){
			var userTags = UserTags.findOne({userId:request.userId});

			if(userTags){
				if(userTags.tags.length < 4){
					return userTags.tags;
				}else{
					var tags = userTags.tags;
					var randomTags = [];
					for(var i = 0; i < 3; i++) {
					    var idx = Math.floor(Math.random() * tags.length);
					    randomTags.push(tags[idx]);
					    tags.splice(idx, 1);
					}

					return randomTags;
				}
			}
		}

		throw new Error("Not authorized");
	},

	'searchTag': function(request){
		if(this.userId){
			var userTags = UserTags.findOne({userId:request.userId});
			var searchedTags = [];

			if(userTags){
				if(userTags.tags.length > 0){
					var limit = userTags.tags.length > 2000 ? 2000 : userTags.tags.length;

					for (var i = 0; i < limit; i++) {
						if(userTags.tags[i].text.indexOf(request.text)> -1){
							var addTag = true;
							for (var j = 0; j < request.assignedTags.length; j++) {

								if(userTags.tags[i]._id == request.assignedTags[j]){
									addTag = false
									break;
								}
							};
							if(addTag){
								searchedTags.push(userTags.tags[i]);
							}
						}

						if(searchedTags.length >2){
							break;
						}
					};
				}
			}

			return searchedTags;
			/*var tags = UserTags.find({text:{'$regex':request.text},
				_id:{$nin:request.assignedTags}}, {limit:3}).fetch();

			return tags;*/
		}
	}
});

Meteor.ValidationUtils = {
	cleanTag: function(tagText){
		return tagText.replace(/\s+/g," ").substring(0,20);
	}
};

Meteor.tagMethodsUtils = {
	createUserTag: function(tagId, tagData){
		var userTagsId = null;
		var currentUserTags = [];

		var existingUserTags = UserTags.findOne({userId:Meteor.userId()});
		if(!existingUserTags){
			var newUserTags = {
				userId: Meteor.userId(),
				tags: [],
				updatedOn: new Date()
			}
			userTagsId = UserTags.insert(newUserTags);
		}else{
			userTagsId = existingUserTags._id;
			currentUserTags = existingUserTags.tags;
		}

		var addTag = true;

		for (var i = 0; i < currentUserTags.length; i++) {
			if(currentUserTags[i]._id == tagId){
				addTag = false;
				return currentUserTags[i];
			}
		}

		if(addTag){
			var newUserTag = {
				_id:tagId, 
				text:tagData.text, 
				addedOn: new Date(), 
				category: tagData.category
			};
			currentUserTags.push(newUserTag);

			UserTags.update({_id:userTagsId},
				{
					userId:Meteor.userId(),
					updatedOn: new Date(),
					tags: currentUserTags
				});

			return newUserTag;
		}
	}
}