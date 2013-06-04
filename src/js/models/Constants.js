// Includes file dependencies
define([
	
	"jquery",
	"backbone",
	
], function($, Backbone) {

    // The Model constructor
    var Constants = Backbone.Model.extend({},
	    {
	    	
	    	DEFAULT_WINDOW_RESIZE_DELAY: 250, //ms
	    	FOLDER_TEMPLATES: "templates/",
	    	EXTENSION_TEMPLATES: ".handlebars",
	    	URL_SERVICES : "http://www.paulyuan.ca/playtogether/services/",
	    	DEFAULT_USER_LAT : 41.8782,
	    	DEFAULT_USER_LNG : -87.6297,
	    	
    	}
    );

    // Returns the Model class
    return Constants;

});