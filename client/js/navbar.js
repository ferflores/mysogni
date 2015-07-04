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
            	Router.go("login");
            }
        })
	},
	"click .switch-lang": function(){

		if(Meteor.I18n().lang() == "es"){
			Meteor.I18n().lang("en");
		}else{
			Meteor.I18n().lang("es");
		}

		Cookie.set('lang', Meteor.I18n().lang());
		console.log(Meteor.I18n().lang());
	}
});