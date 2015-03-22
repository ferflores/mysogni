WelcomeMsgs.allow({
	insert: function (userId, doc) {
		return false;
	},
	update:function(userId, doc){
		return false;
	},
    remove: function(userId, doc) {
        return false;
    }
});

Tags.allow({
	insert: function (userId, doc) {
		return false;
	},
	update:function(userId, doc){
		return false;
	},
    remove: function(userId, doc) {
		return false;
	}
});
