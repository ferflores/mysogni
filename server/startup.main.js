Meteor.startup(function(){
	Tags._ensureIndex({text:1});
	Tags._ensureIndex({userId:1});
});