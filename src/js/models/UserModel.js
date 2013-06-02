define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var UserModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"language": attributes["language"] ? attributes["language"] : null, //LanguageModel object
				"eventType": attributes["eventType"] ? attributes["eventType"] : -1, //int
			});
		},
		
    });

    return UserModel;

} );