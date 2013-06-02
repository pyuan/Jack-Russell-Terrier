/**
 * this is a singleton class
 * initialize the view class based on the loaded page
 */
define([ 
	
		"jquery",
		"backbone", 
		"models/UserModel",
		"views/PTMap",
		"views/LanguageOverlay",
		
	], function( $, Backbone, UserModel, PTMap, LanguageOverlay ) {

    // Extends Backbone.Router
    var ApplicationController = Backbone.Router.extend({
		
		_userModel: null, //UserModel object
		_mapView: null, //PTMap object
		_languageOverlay: null, //LanguageOverlay object
		
        /**
         * The Router constructor
         * @param none
         */ 
        initialize: function() 
        {
        	var self = this;
        	
        	this._userModel = new UserModel({});
        	this._mapView = new PTMap({el: $("#map")});
        	this._languageOverlay = new LanguageOverlay({el: $("#languageOverlay")});
        	this._showLogo();
        	
        	$("body").on("click", "#introLogo", function(){
        		self._hideLogo();
        		self.showLanguagePicker();
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
         * show the intro logo for some time
         * @param none
         */
        _showLogo: function() 
        {
        	var self = this;
        	$("#block, #introLogo").fadeIn(250);
        	setTimeout(function(){
        		self._hideLogo();
        		self.showLanguagePicker();
        	}, 5000);
        },
        
        /**
         * hide the intro logo
         * @param none
         */
        _hideLogo: function() {
        	$("#introLogo").fadeOut(250);
        },
        
        /**
         * show the language picker
         * @param none
         */
        showLanguagePicker: function() {
        	this._languageOverlay.show();
        }

    });

    // Returns the Router class
    return ApplicationController;

} );