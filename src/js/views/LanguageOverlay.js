define([ 
		
		"jquery", 
		"backbone",
		"views/Overlay",
		"utils/DataUtils",
	
	], function( $, Backbone, Overlay, DataUtils ) {
		
    // Extends Overlay class
    var LanguageOverlay = Overlay.extend({
    	
    	_languages: null, //LanguagesCollection object
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
        	options.template = "language_overlay";
        	var onData = function(languages) {
        		self._languages = languages;
        		
        		var langs = [];
        		languages.each(function(language){
        			langs.push({id: language.get("id"), name: language.get("name")});
        		});
        		options.templateParams = {languages: langs};
        		Overlay.prototype.initialize.call(self, options);
        	}
        	DataUtils.getLanguages(onData); 
        },
        
        /**
         * Renders the view
         * @param none
         */
        render: function() 
        {
        	Overlay.prototype.render.call(this);
        	
        	var self = this;
        	
        	//languages change dropdowns, just update preview
        	this.$el.on("change", "#languages", function(){
        		var selected = $(this).val();
        		var language = self._languages.get(selected);
        		self.$el.find("#preview").text(language.get("preview")); //update the views
        	});
        	
        	//on ok button clicked, update user model
        	this.$el.on("click", "#okBtn", function(){
        		var selected = self.$el.find("#languages").val();
        		var language = self._languages.get(selected);
        		var user = controller.getUserModel();
        		user.set("language", language);
        		console.log(user);
        	});
        	
            return this; //Maintains chainability
        },
        
        /**
         * when the panel is being shown
         * @param none
         */
        show: function() {
        	Overlay.prototype.show.call(this);
        },
        
        /**
         * when the panel is being hidden
         * @param none
         */
        hide: function() {
        	Overlay.prototype.hide.call(this);
        	this.$el.find("#okBtn").trigger("click");
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
    return LanguageOverlay;

});