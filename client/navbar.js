Template.navbar.helpers({
	strings: function(){
		return {
			logoutFacebookText: function(){
				return Meteor.I18n().t("Salir");
			}
		}
	}
});

Template.navbar.events({
	"click .logout": function(){
		Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }else{
            	Route.go("login");
            }
        })
	}
});