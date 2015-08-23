Accounts.onCreateUser(function(options, user) {
    if (typeof(user.services.facebook) != "undefined") {
        user.services.facebook.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
    }

    user['firstLogin'] = true;

    return user;
});