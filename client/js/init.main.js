Meteor.startup(function () {
	if(Cookie.get('lang')){
		Meteor.I18n().lang(Cookie.get('lang'));
	}
});

(function(){

	var connStatus = Tracker.autorun(checkConnStatus);
	var connectedOnce = false;
	var warningGiven = false;

	function checkConnStatus(){
		if (Meteor.status().connected) {
	        connectedOnce = true;
	        Session.set("offline", false);
	    } else {
	    	Session.set("offline", true);
	    	if(connectedOnce && !warningGiven){
	    		warningGiven = true;
	        	Modals.errorModal("Offline",{error:"Conexión perdida"});
	    	}
	    }
	}

})();

