Meteor.startup(function(){
	Tags._ensureIndex({text:1});
});