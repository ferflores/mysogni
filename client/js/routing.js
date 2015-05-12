Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('login', { path:'/'});
	this.route('home');
	this.route('tags');
	this.route('faces');
	this.route('dreamList');
})

Router.onBeforeAction(function(){
	if (!Meteor.userId()) {
    	this.render('login');
  	}else{
  		 $('#mainContent').css('display', 'none');
  	}

  	this.next();
});

Router.onAfterAction(function(){
	//Running twice?
	//$('#mainContent').velocity('transition.fadeIn',1000)
});