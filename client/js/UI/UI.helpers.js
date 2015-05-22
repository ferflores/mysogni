UI.registerHelper("formatDate", function(datetime, format) {
	DateFormats = {
       short: "DD - MMMM - YYYY",
       long: "dddd DD.MM.YYYY HH:mm"
	};
	if (moment) {
		format = DateFormats[format] || format;
		return moment(datetime).format(format);
	}else {
		return datetime;
	}
});

UI.registerHelper("shortDreamText", function(dreamText, maxLength){
	if(dreamText && dreamText.length > maxLength){
		return dreamText.substring(0, maxLength) + '...';
	}

	return dreamText;
});