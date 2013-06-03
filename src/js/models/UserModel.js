define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var UserModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"language": attributes["language"] ? attributes["language"] : null, //LanguageModel object
				"sport": attributes["sport"] ? attributes["sport"] : null, //SportModel object
			});
		},
		
    });

    return UserModel;

} );