define([ 
		
		"jquery",
		"backbone",
		"models/EventModel"
		 
	], function( $, Backbone, EventModel ) {

    var EventsCollection = Backbone.Collection.extend( {
    	
        /**
         * The Collection constructor
         * @param models
         * @param options
         */
        initialize: function( models, options ) 
        {
			this.comparator = function(item) {
    			return item.get("name"); 
			};
        },

        model: EventModel,

    });

    return EventsCollection;

});
