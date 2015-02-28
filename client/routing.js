Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('login', { path:'/'});
	this.route('home');
})

Router.onBeforeAction(function(){
	 $('#mainContent').css('display', 'none');
	 this.next();
});

Router.onAfterAction(function(){
	$('#mainContent').velocity('transition.fadeIn',1000)
});