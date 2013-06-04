/**
 * this is a singleton class
 * initialize the view class based on the loaded page
 */
define([ 
	
		"jquery",
		"backbone", 
		"blur",
		"models/UserModel",
		"views/PTMap",
		"views/LanguageOverlay",
		"views/SportOverlay",
		"views/FilterButtons",
		"views/InfoOverlay",
		
	], function( $, Backbone, Blur, UserModel, PTMap, LanguageOverlay, SportOverlay, FilterButtons, InfoOverlay ) {

    // Extends Backbone.Router
    var ApplicationController = Backbone.Router.extend({
		
		_userModel: null, //UserModel object
		_mapView: null, //PTMap object
		_languagePicker: null, //LanguageOverlay object
		_sportPicker: null, //SportOverlay object
		_filterButtons: null, //FilterButtons object
		_infoOverlay: null, //InfoOverlay object
		
        /**
         * The Router constructor
         * @param none
         */ 
        initialize: function() 
        {
        	var self = this;
        	
        	this._userModel = new UserModel({});
        	this._mapView = new PTMap({el: $("#map")});
        	this._languagePicker = new LanguageOverlay({el: $("#languageOverlay")});
        	this._sportPicker = new SportOverlay({el: $("#sportOverlay")});
        	this._filterButtons = new FilterButtons({el: $("#filterButtons")});
        	this._infoOverlay = new InfoOverlay({el: $("#infoOverlay")});

        	this._showStep1();
        	
        	$("body").on("click", "#introLogo", function(){
        		self._showStep2();
        	});
        	
            console.log("Application intialized.");
        },
        
        /**
         * return the user model object
         * @param none
         * @return userModel
         */
        getUserModel: function() {
        	return this._userModel;
        },
        
        /**
         * show white overlay and blur the background
         * @param none
         */
        _showWhiteOverlay: function()
        {
        	$("#block").fadeIn(500);
        	$("#footer, #map, #foreground").blurjs({
			    radius: 10,
			    persist: false
			});
        },
        
        /**
         * hide the white overlay and unblur the background
         * @param none
         */
        _hideWhiteOverlay: function()
        {
        	$.blurjs('reset');
        	$("#block").hide();
        },
        
        /**
         * show the intro logo for some time
         * @param none
         */
        _showStep1: function() 
        {
        	var self = this;
        	$("#introLogo").fadeIn(250);
        	this._showWhiteOverlay();
        },
        
        /**
         * show the language picker
         * @param none
         */
        _showStep2: function() {
        	$("#introLogo").fadeOut(250);
        	this.showLanguagePicker();
        },
        
        /**
         * show the sport picker
         * @param none
         */
        showStep3: function() {
        	this.showSportPicker();
        },
        
        /**
         * hide the white overlay
         * @param none
         */
        showStep4: function() {
        	this.hideSportPicker();
        	this._hideWhiteOverlay();
        },
        
        /**
         * show the language picker
         * @param none
         */
        showLanguagePicker: function() {
        	this._hideAllOverlays();
        	this._languagePicker.show();
        },
        
        /**
         * hide the laguage picker
         * @param none
         */
        hideLanguagePicker: function() {
        	this._languagePicker.hide();
        },
        
        /**
         * toggle show hide of the language picker
         * @param none
         */
        toggleLanguagePicker: function() {
        	this._languagePicker.isShowing() ? this.hideLanguagePicker() : this.showLanguagePicker();
        },
        
        /**
         * show the sport picker
         * @param none
         */
        showSportPicker: function() {
        	this._hideAllOverlays();
        	this._sportPicker.show();
        },
        
        /**
         * hide the sport picker
         * @param none
         */
        hideSportPicker: function() {
        	this._sportPicker.hide();
        },
        
        /**
         * toggle show/hide sport picker
         * @param none
         */
        toggleSportPicker: function() {
        	this._sportPicker.isShowing() ? this.hideSportPicker() : this.showSportPicker();
        },
        
        /**
         * show the info overlay
         * @param none
         */
        showInfoOverlay: function() {
        	this._hideAllOverlays();
        	this._infoOverlay.show();
        },
        
        /**
         * hide the info overlay
         * @param none
         */
        hideInfoOverlay: function() {
        	this._infoOverlay.hide();
        },
        
        /**
         * toggle show/hide info overlay
         * @param none
         */
        toggleInfoOverlay: function() {
        	this._infoOverlay.isShowing() ? this.hideInfoOverlay() : this.showInfoOverlay();
        },
        
        /**
         * hide all the overlays
         * @param none
         */
        _hideAllOverlays: function() {
        	$(".overlay").removeClass("showing");
        },
        
        /**
         * update the map with the selected sport
         * @param none
         */
        updateMap: function() {
        	this._mapView.render();
        },
        
        /**
         * show the spinner by the filters
         * used for loading anything at the application level
         * @param none
         */
        showSpinner: function() {
        	$("#filtersSpinner").show();
        },
        
        /**
         * hide the spinner
         * used for loading anything at the application level
         * @param none
         */
        hideSpinner: function() {
        	$("#filtersSpinner").hide();
        },
        
        /**
         * center the map on a point
         * @param lat, number
         * @param lng, number
         */
        centerMap: function(lat, lng) {
        	this._mapView.setCenter(lat, lng);
        },

    });

    // Returns the Router class
    return ApplicationController;

} );