Meteor.methods({
	'getUserTagCount': function(){
		if(this.userId){

			return UserTags.findOne({userId:this.userId}).tags.count();
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
		}else{
			throw new Error("Not authorized");
		}
		
		return [];
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

								if(userTags.tags[i].text == request.assignedTags[j]){
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
		}
	}
});
