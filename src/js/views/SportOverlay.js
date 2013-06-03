define([ 
		
		"jquery", 
		"backbone",
		"views/Overlay",
		"utils/DataUtils",
	
	], function( $, Backbone, Overlay, DataUtils ) {
		
    // Extends Overlay class
    var SportOverlay = Overlay.extend({
    	
    	/**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
        	options.template = "sports_overlay";
        	var onData = function(sports) {

        		var arr = [];
        		sports.each(function(sport){
        			arr.push({id: sport.get("id"), name: sport.get("name"), icon: sport.get("icon")});
        		});
        		options.templateParams = {sports: arr};
        		Overlay.prototype.initialize.call(self, options);
        	}
        	DataUtils.getSports(onData); 
        },
        
        /**
         * Renders the view
         * @param none
         */
        render: function() 
        {
        	Overlay.prototype.render.call(this);
        	
        	var self = this;
        	
        	//click handler for sport icons
        	this.$el.on("click", ".sportIcon", function(){
        		var user = controller.getUserModel();
        		user.get("eventType") == -1 ? controller.showStep4() : controller.hideSportPicker();
        		
        		$(this).siblings(".sportIcon").removeClass("selected");
        		$(this).addClass("selected");
        		
        		var id = $(this).attr("data-id");
        		user.set("eventType", id);
        	});
        	
            return this; //Maintains chainability
        },
        
        /**
         * when the panel is being shown
         * @param none
         */
        show: function() {
        	Overlay.prototype.show.call(this);
        	
        	var user = controller.getUserModel();
        	var type = user.get("eventType");
        	if(type != -1) {
        		this.$el.find(".sportIcon").removeClass("selected");
        		this.$el.find(".sportIcon[data-id=" + type + "]").addClass("selected");
        	}
        },
        
        /**
         * when the panel is being hidden
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
    return SportOverlay;

});