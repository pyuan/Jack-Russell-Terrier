define([ 
		
		"jquery", 
		"backbone",
		"views/Overlay",
	
	], function( $, Backbone, Overlay ) {
		
    // Extends Overlay class
    var NewEventOverlay = Overlay.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	options.template = "new_event_overlay";
        	Overlay.prototype.initialize.call(this, options);
        },
        
        /**
         * Renders the view
         * @param none
         */
        render: function() 
        {
        	Overlay.prototype.render.call(this);
        	
        	var self = this;
        	
        	//click handler to close overlay
        	this.$el.on("click", "#closeBtn", function(){
        		self.hide();
        	});
        	
            return this; //Maintains chainability
        },
        
        /**
         * when the view is being shown
         * @param none
         */
        show: function() {
        	Overlay.prototype.show.call(this);
        },
        
        /**
         * when the view is being hidden
         * @param none
         */
        hide: function() {
        	Overlay.prototype.hide.call(this);
        },
        
        /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	Overlay.prototype.dispose.call(this);
        },

    });

    // Returns the View class
    return NewEventOverlay;

});