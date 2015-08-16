Template.home.rendered = function(){

	if(!Meteor.userId()){
		FlowRouter.go("/login");
	}
	
	Meteor.subscribe("wMessages");
	Meteor.subscribe("dreamDateOptions");

	$('#datepicker').datepicker({
		format: 'yyyy/mm/dd',
		autoclose: true
	}).on("changeDate", function(e){
		Session.set('dreamDate', {date:$('#datepicker').val(), value:2});
	});

	if(Session.get('dreamDate')){
		$('#datepicker').val(Session.get('dreamDate').date);
		$('#dateOptions').val(Session.get('dreamDate').value);

		if(Session.get('dreamDate').value == "2"){
			$("#datepickerdiv").show();
		}
		
	}else{

		$('#datepicker').val(moment().format('YYYY/MM/DD'));

		Session.set('dreamDate', {date:$('#datepicker').val(), value:0});
	}

}

Template.home.events({
	"click .save-dream": function(event){
		if(Session.get("dreamText") && Session.get("dreamText").length > 0){
			FlowRouter.go("/faces");
		}
	},

	"keyup .dream-input": function(event){
		Session.setPersistent("dreamText", event.target.value);
	},

	"change #dateOptions": function(event){
		if($("option:selected", event.target).val() == "2"){

			$("#datepickerdiv").show();

		}else{

			$("#datepickerdiv").hide();
		}

		var newDate = moment().format('YYYY/MM/DD');
		var dateValue = $("option:selected", event.target).val();

		switch(dateValue){
			case '0':
				break;
			case '1':
				newDate = moment().subtract(1, 'days').format('YYYY/MM/DD');
				break;
			case '2':
				newDate = $('#datepicker').val();
				break;
			case '3':
				newDate = moment().subtract(7, 'days').format('YYYY/MM/DD');
				break;
			case '4':
				newDate = moment().subtract(5, 'months').format('YYYY/MM/DD');
				break;
			case '5':
				newDate = moment().subtract(3, 'years').format('YYYY/MM/DD');
				break;
			case '6':
				newDate = moment().subtract(10, 'years').format('YYYY/MM/DD');
				break;
			default:
				newDate = moment.format('YYYY/MM/DD');
				break;
		}

		Session.set('dreamDate', {date:newDate, value:parseInt(dateValue)});
	}
});

Template.home.helpers({
	'randomMessage': function(){

		Meteor.call('getRandomMessage', "", randomMessageLoaded);

		function randomMessageLoaded(error, message){
			if(error){
				$("#randomMessage").hide();
			}else{
				$("#randomMessage").show();
				var text = message[Meteor.I18n().lang()]
				$("#randomMessageText").text(text);
			}
		}
	},

	'disabledSaveDream': function(){
		return Session.get("dreamText") ? "" : "disabled";
	},

	'dreamText': function(){
		return Session.get("dreamText");
	},

	'dreamDateOptions': function(){
		return DreamDateOptions.find({},{sort:{value:1}});
	}
});