define([ 
	
		"jquery", 
		"backbone",
		"models/Constants",
		 
	], function( $, Backbone, Constants ) {

    var UserModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"language": attributes["language"] ? attributes["language"] : null, //LanguageModel object
				"sport": attributes["sport"] ? attributes["sport"] : null, //SportModel object
				"lat": attributes["lat"] ? attributes["lat"] : Constants.DEFAULT_USER_LAT,
				"lng": attributes["lng"] ? attributes["lng"] : Constants.DEFAULT_USER_LNG, 
			});
			
			this._getUserLocation();
		},
		
		/**
		 * get the user's current location
		 * @param none
		 */
		_getUserLocation: function()
		{
			var self = this;
			var onSuccess = function(position) {
			    self.set({"lat": position.coords.latitude, "lng": position.coords.longitude});
			    controller.centerMap(self.get("lat"), self.get("lng"));
			    console.log("UserModer._getUserLocation success: " + position.coords.latitude + ", " + position.coords.longitude);
			};

			function onError(error) {
			    console.log("UserModer._getUserLocation error: " + error.message);
			};
			
			navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 5000});
			console.log("Getting user's location...");
		},
		
    });

    return UserModel;

} );