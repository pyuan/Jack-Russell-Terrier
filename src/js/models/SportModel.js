define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var SportModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"id": attributes["id"] ? attributes["id"] : "",
				"name": attributes["name"] ? attributes["name"] : "",
				"icon": attributes["icon"] ? attributes["icon"] : "",
			});
		},
		
    });

    return SportModel;

} );