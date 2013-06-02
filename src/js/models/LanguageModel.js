define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var LanguageModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"id": attributes["id"] ? attributes["id"] : "",
				"name": attributes["name"] ? attributes["name"] : "",
				"preview": attributes["preview"] ? attributes["preview"] : "",
			});
		},
		
    });

    return LanguageModel;

} );