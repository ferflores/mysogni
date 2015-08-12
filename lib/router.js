FlowRouter.route('/',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'home'})
		}
	});

FlowRouter.route('/login',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'login'})
		}
	});

FlowRouter.route('/faces',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'faces'})
		}
	});

FlowRouter.route('/tags',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'tags'})
		}
	});

FlowRouter.route('/dreamList',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'dreamList'})
		}
	});

FlowRouter.route('/viewDream',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'viewDream'})
		}
	});

FlowRouter.route('/editDream',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'editDream'})
		}
	});

FlowRouter.route('/editFaces',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'editFaces'})
		}
	});

FlowRouter.route('/editTags',
	{
		action: function (params) {
			BlazeLayout.render('layout', {body:'editTags'})
		}
	});

FlowRouter.triggers.enter([redirectIfNoUser]);
FlowRouter.triggers.exit([hideBody]);

function redirectIfNoUser(context, redirect){
	if (context.path != '/login' && !Meteor.userId()) {
		redirect('/login');
	}

	showBody();
}

function hideBody(){
	$('#bodyContent').css('display', 'none');
}

function showBody(){
	$('#bodyContent').velocity('transition.fadeIn',1000)
}