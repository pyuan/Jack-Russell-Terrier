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
		
	], function( $, Backbone, Blur, UserModel, PTMap, LanguageOverlay, SportOverlay ) {

    // Extends Backbone.Router
    var ApplicationController = Backbone.Router.extend({
		
		_userModel: null, //UserModel object
		_mapView: null, //PTMap object
		_languagePicker: null, //LanguageOverlay object
		_sportPicker: null, //SportOverlay object
		
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
        	$("#footer, #map").blurjs({
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
        	this.hideLanguagePicker();
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
         * show the sport picker
         * @param none
         */
        showSportPicker: function() {
        	this._sportPicker.show();
        },
        
        /**
         * hide the sport picker
         * @param none
         */
        hideSportPicker: function() {
        	this._sportPicker.hide();
        },

    });

    // Returns the Router class
    return ApplicationController;

} );