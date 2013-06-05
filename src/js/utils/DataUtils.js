define([
		
		"jquery", 
		"backbone",
		"collections/LanguagesCollection",
		"collections/SportsCollection",
		"collections/EventsCollection",
		"models/LanguageModel",
		"models/SportModel",
		"models/EventModel",
		"models/Constants",
		
	], function($, Backbone, LanguagesCollection, SportsCollection, EventsCollection, 
		LanguageModel, SportModel, EventModel, Constants) {

	var DataUtils = Backbone.Model.extend({},
	
	{
		/**
		 * send ajax request to read a json file in the data folder
		 * @param file, string
		 * @param onResultHandler, function to receive json
		 */
		_getData: function(file, onResultHandler)
		{
			$.ajax({
				type: "GET",
				url: "data/" + file,
				dataType: "json",
				cache: false,
				success: function(data) {
					console.log("Data file " + file + " loaded: ");
					console.log(data);
					
					if(onResultHandler) {
						onResultHandler(data);
					}
				}
			});	
		},
		
		/**
		 * get the languages
		 * @param onResultHandler, function to receive a LanguagesCollection
		 */
		getLanguages: function(onResultHandler) 
		{
			var onData = function(json) 
			{
				var arr = [];
				for(var i in json) {
					var l = json[i];
					var language = new LanguageModel(l);
					arr.push(language);
				}
				var languages = new LanguagesCollection(arr);
				
				if(onResultHandler) {
					onResultHandler(languages);
				}
			}
			this._getData("languages.json", onData);
		},
		
		/**
		 * get the sports
		 * @param onResultHandler, function to receive a LanguagesCollection
		 */
		getSports: function(onResultHandler) 
		{
			var onData = function(json) 
			{
				var arr = [];
				for(var i in json) {
					var s = json[i];
					var sport = new SportModel(s);
					arr.push(sport);
				}
				var sports = new SportsCollection(arr);
				
				if(onResultHandler) {
					onResultHandler(sports);
				}
			}
			this._getData("sports.json", onData);
		},
		
		/**
		 * get events by sport
		 * @param type, int
		 * @param onResultHandler, function to receive a EventsCollection
		 */
		getEventsByType: function(type, onResultHandler)
		{
			$.ajax({
				type: "GET",
				url: Constants.URL_SERVICES + "getEventsByType.php",
				data: {type: type},
				dataType: "json",
				cache: false,
				success: function(data) {
					console.log("Events received for type: " + type);
					console.log(data);
					
					var arr = [];
					for(var i in data.events)
					{
						var e = data.events[i];
						var event = new EventModel(e);
						arr.push(event);
					}
					var events = new EventsCollection(arr);
					
					if(onResultHandler) {
						onResultHandler(events);
					}
				}
			});	
		},
		
		/**
		 * get event detail by id and locale
		 * @param id, int
		 * @param locale, string constant
		 * @param onResultHandler, function to receive a EventModel
		 */
		getEventById: function(id, locale, onResultHandler)
		{
			$.ajax({
				type: "GET",
				url: Constants.URL_SERVICES + "getEventById.php",
				data: {id: id, locale: locale},
				dataType: "json",
				cache: false,
				success: function(data) {
					console.log("Event received for id: " + id + " with locale: " + locale);
					console.log(data);
					
					var event = new EventModel(data.event);
					if(onResultHandler) {
						onResultHandler(event);
					}
				}
			});	
		},
			
	});

	return DataUtils;

}); 