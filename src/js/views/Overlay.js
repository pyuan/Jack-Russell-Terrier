define([ 
		
		"jquery", 
		"backbone",
		"utils/TemplateUtils",
	
	], function( $, Backbone, TemplateUtils ) {
		
    // Extends Backbone.View
    var Overlay = Backbone.View.extend( {
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
			var self = this;
			
			if(options.template)
			{
				var onTemplate = function(html) {
					self.$el.append(html);
					self.render();
				};
				
				var params = options.templateParams ? options.templateParams : {};
				TemplateUtils.getTemplate(options.template, params, onTemplate);
			}
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
         * when the panel is being shown
         * @param none
         */
        show: function() {
        	//TweenMax.to(this.$el, 0.25, {autoAlpha:1, delay: 0.25});
        	this.$el.addClass("showing");
        },
        
        /**
         * when the panel is being hidden
         * @param none
         */
        hide: function() {
        	//TweenMax.to(this.$el, 0.25, {autoAlpha:0.25});
        	this.$el.removeClass("showing");
        },
        
        /**
         * returns if the panel is current showing
         * @param none
         * @return isShowing, boolean
         */
        isShowing: function() {
        	return this.$el.hasClass("showing");
        },
        
        /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	
        },

    });

    // Returns the View class
    return Overlay;

});