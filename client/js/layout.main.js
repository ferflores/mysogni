Template.layout.helpers({
	'isOffline': function (argument) {
		return Session.get("offline");
	}
})