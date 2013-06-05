define([ 
		
		"jquery", 
		"backbone",
		"models/Constants",
		"utils/DataUtils",
	
	], function( $, Backbone, Constants, DataUtils ) {
		
    // Extends Backbone.View
    var PTMap = Backbone.View.extend( {
		
		_map: null, //google maps object
		_icons: [], //array of google maps icon objects
		_clickPosition: null, //{x: int, y: int}
		
        /**
         * The View Constructor
         * @param el, DOM element of the page
         */
        initialize: function(options) 
        {
        	var self = this;
        	setTimeout(function(){
        		var mapOptions = {
				    zoom: 13,
				    center: new google.maps.LatLng(Constants.DEFAULT_USER_LAT, Constants.DEFAULT_USER_LNG),
				    disableDefaultUI: true,
				    mapTypeId: google.maps.MapTypeId.ROADMAP
				};
				self._map = new google.maps.Map(self.$el.get(0), mapOptions);
        	}, 250);
        	
        	//track the location of the click to position the event details overlay
        	this.$el.on("click", function(e){
        		self._clickPosition = {x: e.pageX, y:e.pageY};
        	});
        },

        /**
         * Renders the view
         * @param none
         */
        render: function() 
        {
        	var self = this;
        	var user = controller.getUserModel();
        	var sport = user.get("sport");
        	
        	controller.showSpinner();
        	var onData = function(events) {
        		controller.hideSpinner();
        		self._drawMapIcons(events);
        	};
        	DataUtils.getEventsByType(sport.get("id"), onData);
        	
            return this; //Maintains chainability
        },
        
        /**
         * plot store icons
         * @param events, EventsCollection
         */
        _drawMapIcons: function(events)
        {
        	var self = this;
        	
        	//remove existing store markers
        	for(var i in this._icons) {
        		var icon = this._icons[i];
        		icon.setMap(null);
        		google.maps.event.clearListeners(icon, "click");
        	}
        	
        	//get the icon image
        	var user = controller.getUserModel();
    		var sport = user.get("sport");
    		var image = sport.get("map_icon");
        	
        	var addIcon = function(event) 
        	{
        		var latlng = new google.maps.LatLng(event.get("lat"), event.get("lng"));
			     
			    var icon = new google.maps.Marker({
			        position: latlng, 
			        map: self._map,
		        	icon: image,
		        	animation: google.maps.Animation.DROP,
		        	event: event
			    });  
			     
			    var attachClickHandler = function(marker) {
			    	google.maps.event.addListener(marker, "click", function() {
			    		marker.setAnimation(google.maps.Animation.BOUNCE);
			    		setTimeout(function(){
			    			marker.setAnimation(null);
			    		}, 2100);
			    		
			        	self._handleIconClick(marker);
			        	//self.setCenter(marker.position.lat(), marker.position.lng());
			        });
			    };
			    attachClickHandler(icon);
			    self._icons.push(icon);
        	};
        	
        	//use timer so icons dont all drop at the same time
	        this._icons = [];
	        events.each(function(event, index){
        		setTimeout(function(){
        			addIcon(event);
        		}, index * 100);
	        });
        },
        
        /**
         * when an icon is clicked
         * delay to wait for the click position to be detected
         * @param marker, google maps icon object
         */
        _handleIconClick: function(marker)
        {
        	var self = this;
        	setTimeout(function(){
        		
        		var event = marker.event;
        		controller.showEventOverlay(event.id, self._clickPosition.x, self._clickPosition.y);
        		
        	}, 250);
        },
        
        /**
         * center the map on a lat and lng
         * @param lat, number
         * @param lng, number
         */
        setCenter: function(lat, lng) 
        {
        	var center = new google.maps.LatLng(lat, lng)
        	if(this._map) {
        		this._map.setCenter(center);
        	}
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