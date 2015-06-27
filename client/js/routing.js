Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	this.route('login');
	this.route('home', { path:'/'});
	this.route('tags');
	this.route('faces');
	this.route('dreamList');
	this.route('viewDream');
	this.route('editDream');
	this.route('editFaces');
	this.route('editTags');
})

Router.onBeforeAction(function(){
	if (!Meteor.userId()) {
    	this.render('login');
  	}else{
  		 $('#bodyContent').css('display', 'none');
  	}

  	this.next();
});

Router.onAfterAction(function(){
	$('#bodyContent').velocity('transition.fadeIn',1000)
});