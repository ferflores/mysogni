Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('login', { path:'/', fastRender:true});
	this.route('home');
})

Router.onBeforeAction(function(){
	if (!Meteor.userId()) {
    	this.render('login');
  	} else {
    $('#mainContent').css('display', 'none');
		this.next();
  }

});

Router.onAfterAction(function(){
	$('#mainContent').velocity('transition.fadeIn',1000)
});