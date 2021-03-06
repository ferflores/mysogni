Meteor.startup(function () {
	if(Cookie.get('lang')){
		Meteor.I18n().lang(Cookie.get('lang'));
	}else{
		Meteor.I18n().lang('es');
	}
});

(function(){

	var connStatus = Tracker.autorun(checkConnStatus);
	var connectedOnce = false;
	var warningGiven = false;
	var checkingStatus = false;
	var disconnectedOnce = false;

	function checkConnStatus(){
		if (Meteor.status().connected) {
	        connectedOnce = true;
	        Session.set("offline", false);
	        if(disconnectedOnce){
	        	checkingStatus = false;
	        }
	    } else {
	    	if(connectedOnce){
	    		disconnectedOnce = true;
		    	if(!checkingStatus){
		    		Meteor.reconnect();
			    	checkingStatus = true;
			    	setTimeout(recheckConnStatus, 6000);
		    	}
	    	}
	    }
	}

	function recheckConnStatus(){
		if(!Meteor.status().connected){
			Session.set("offline", true);
			if(!warningGiven){
				warningGiven = true;
		    	Modals.popupMessage("Offline",{error:"Conexión perdida"});
			}
		}else{
			checkingStatus = false;
		}
	}

})();

