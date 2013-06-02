define([ 
		
		"jquery",
		"backbone",
		"models/LanguageModel"
		 
	], function( $, Backbone, LanguageModel ) {

    var LanguagesCollection = Backbone.Collection.extend( {
    	
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

        model: LanguageModel,

    });

    return LanguagesCollection;

});
