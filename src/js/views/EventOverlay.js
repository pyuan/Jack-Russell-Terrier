define([ 
		
		"jquery", 
		"backbone",
		"cftoaster",
		"views/Overlay",
		"utils/DataUtils",
		"utils/TemplateUtils",
	
	], function( $, Backbone, CFToaster, Overlay, DataUtils, TemplateUtils ) {
		
    // Extends Overlay class
    var EventOverlay = Overlay.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	options.template = "event_overlay";
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
        	
        	//signup click handler
        	this.$el.on("click", "#signupBtn", function(){
        		var msg = "You are signed up!";
        		$("body").cftoaster({content: msg});
        		self.hide();
        	});
        	
            return this; //Maintains chainability
        },
        
        /**
         * when the view is being shown
         * @param eventId, int
         * @param x, int
         * @param y, int
         */
        show: function(eventId, x, y) 
        {
        	Overlay.prototype.show.call(this);
        	
        	var self = this;
        	var user = controller.getUserModel();
        	var language = user.get("language");
        	
        	var content = this.$el.find("#contentWrapper").html("");
        	this._showSpinner();
        	var onData = function(event) {
        		self._hideSpinner();
    			
    			var params = {name: event.get("name"), address: event.get("address"), description: event.get("description"),
    				locName: event.get("loc_name"), phone: event.get("phone"), schedule: event.get("schedule"), 
    				lat: event.get("lat"), lng: event.get("lng"), cost: event.get("price")};
    			
    			var onTemplate = function(html) {
    				$(content).html(html);
    			};
    			TemplateUtils.getTemplate("event_details", params, onTemplate);
    		};
    		DataUtils.getEventById(eventId, language.get("id"), onData);
    		
    		//position the overlay
    		this._reposition(x, y);
        },
        
        /**
         * position the overlay based on a point
         * @param x, int
         * @param y, int
         */
        _reposition: function(x, y)
        {
        	var left = x + 35;
        	var top  = y - 50;
        	
        	if( $(window).width() - (left + this.$el.width()) < 50 ) {
        		left = x - this.$el.width() - 100;
        	}
        	
        	if(top < 25) {
        		top = 25;
        	}
        	
        	if( $(window).height() - (top + this.$el.height()) < 50 ) {
        		top = $(window).height() - this.$el.height() - 75;
        	}
        	
        	this.$el.css({left: left+"px", top: top+"px"});
        },
        
        /**
         * when the view is being hidden
         * @param none
         */
        hide: function() {
        	Overlay.prototype.hide.call(this);
        	this.$el.css({"left": "", "top": ""});
        },
        
        /**
         * show the spinner
         * @param none
         */
        _showSpinner: function() {
        	this.$el.find(".spinner").show();
        },
        
        /**
         * hide the spinner
         * @param none
         */
        _hideSpinner: function() {
        	this.$el.find(".spinner").hide();
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
    return EventOverlay;

});