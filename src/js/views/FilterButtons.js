define([ 
		
		"jquery", 
		"backbone",
		"utils/TemplateUtils",
	
	], function( $, Backbone, TemplateUtils ) {
		
    // Extends Backbone.View
    var FilterButtons = Backbone.View.extend( {
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
			var self = this;
			var onTemplate = function(html) {
				self.$el.append(html);
				self.render();
			};
			
			TemplateUtils.getTemplate("filter_buttons", {}, onTemplate);
        },

        /**
         * Renders the view
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	
        	//add binding to update buttons whenever user selections change
        	var user = controller.getUserModel();
        	user.on("change", function(){
        		var language = user.get("language");
        		if(language) {
        			var abbrev = language.get("id").toUpperCase().substring(0, 3);
        			self.$el.find("#languageBtn").text(abbrev);
        		}
        		
        		var sport = user.get("sport");
        		if(sport){
        			self.$el.find("#sportBtn").css("background-image", "url(" + sport.get("icon") + ")");
        		}
        	});
        	
        	//show language picker
        	this.$el.on("click", "#languageBtn", function(){
        		controller.toggleLanguagePicker();
        	});
        	
        	//show sport picker
        	this.$el.on("click", "#sportBtn", function(){
        		controller.toggleSportPicker();
        	});
        	
        	//show the new event overlay
        	this.$el.on("click", "#newBtn", function(){
        		controller.toggleNewEventOverlay();
        	});
        	
        	//show info overlay
        	this.$el.on("click", "#infoBtn", function(){
        		controller.toggleInfoOverlay();
        	});
        	
            return this; //Maintains chainability
        },
        
        /**
         * do any cleanup, remove window binding here
         * @param none
         */
        dispose: function() {
        	
        },

    });

    // Returns the View class
    return FilterButtons;

});