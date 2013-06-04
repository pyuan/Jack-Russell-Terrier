define([ 
	
		"jquery", 
		"backbone",
		 
	], function( $, Backbone ) {

    var EventModel = Backbone.Model.extend({
		
		initialize: function(attributes, options)
		{
			this.set({
				"id": attributes["id"] ? attributes["id"] : "",
				"name": attributes["name"] ? attributes["name"] : "",
				"loc_name": attributes["loc_name"] ? attributes["loc_name"] : "",
				"description": attributes["description"] ? attributes["description"] : "",
				"address": attributes["address"] ? attributes["address"] : "",
				"phone": attributes["phone"] ? attributes["phone"] : "",
				"price": attributes["price"] ? attributes["price"] : "",
				"schedule": attributes["schedule"] ? attributes["schedule"] : "",
				"type": attributes["type"] ? attributes["type"] : -1,
				"lat": attributes["lat"] ? attributes["lat"] : -1,
				"lng": attributes["lng"] ? attributes["lng"] : -1,
			});
		},
		
    });

    return EventModel;

} );