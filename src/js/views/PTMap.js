define([ 
		
		"jquery", 
		"backbone",
		"models/Constants",
	
	], function( $, Backbone, Constants ) {
		
    // Extends Backbone.View
    var PTMap = Backbone.View.extend( {
		
		_map: null, //google maps object
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
        	setTimeout(function(){
        		var mapOptions = {
				    zoom: 12,
				    center: new google.maps.LatLng(Constants.DEFAULT_USER_LAT, Constants.DEFAULT_USER_LNG),
				    disableDefaultUI: true,
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				self._map = new google.maps.Map(self.$el.get(0), mapOptions);
        	}, 250);
        },

        /**
         * Renders the view
         * @param none
         */
        render: function() {
        	$(window).trigger("resize");
            return this; //Maintains chainability
        },
        
        /**
         * when the panel is resized
         * @param none
         */
        onResize: function() {
        	
        },
        
        /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	
        },

    });

    // Returns the View class
    return PTMap;

});