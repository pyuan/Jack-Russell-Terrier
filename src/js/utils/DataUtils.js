define([
		
		"jquery", 
		"backbone",
		"collections/LanguagesCollection",
		"collections/SportsCollection",
		"models/LanguageModel",
		"models/SportModel",
		
	], function($, Backbone, LanguagesCollection, SportsCollection, LanguageModel, SportModel) {

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
			
	});

	return DataUtils;

}); 