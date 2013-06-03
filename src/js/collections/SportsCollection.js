define([ 
		
		"jquery",
		"backbone",
		"models/SportModel"
		 
	], function( $, Backbone, SportModel ) {

    var SportsCollection = Backbone.Collection.extend( {
    	
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

        model: SportModel,

    });

    return SportsCollection;

});
