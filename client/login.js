Template.login.events({
	"submit .loginForm": function(event){
		Router.go('home');
		return false;
	}
});