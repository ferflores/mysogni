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

TagCategories.allow({
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

DreamMoods.allow({
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


Dreams.allow({
	insert: function (userId, doc) {
		return (userId && doc.userId === userId);
	},
	update:function(userId, doc){
		return (userId && doc.userId === userId);
	},
    remove: function(userId, doc) {
		return false;
	}
});
