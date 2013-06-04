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
				"map_icon": attributes["map_icon"] ? attributes["map_icon"] : "",
			});
		},
		
    });

    return SportModel;

} );