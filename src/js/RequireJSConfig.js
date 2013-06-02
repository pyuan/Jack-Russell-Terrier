
// Sets the require.js configuration for your application.
require.config( {

      // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.8.2.min")
      paths: {

            // Core Libraries
            "jquery"		: "http://code.jquery.com/jquery-2.0.0.min", 
            "underscore"	: "../libs/underscore/underscore-min",
            "backbone"		: "../libs/backbone/backbone-min",
            "handlebars"	: "../libs/handlebars/handlebars",
            "scrollto"		: "../libs/scrollto/jquery.scrollTo-1.4.3.1-min",
            "less"			: "../libs/less/less-1.3.3.min",
            "bootstrap"		: "../libs/bootstrap/js/bootstrap.min",
            "gsap"			: "../libs/gsap/jquery.gsap.min",
            "tweenmax"		: "../libs/gsap/TweenMax.min",
            "akita"			: "../libs/akita/jquery.akita.1.1.min",
            "helper"		: "../libs/mobile_boiler_plate/helper",
            "plugins"		: "../libs/mobile_boiler_plate/plugins",
            "cftoaster"		: "../libs/cftoaster/jquery.cftoaster.1.0.0.min",
            "blur"			: "../libs/blurjs/blur.min",

      },

      // Sets the configuration for your third party scripts that are not AMD compatible
      shim: {
			
            "backbone": {
            	"deps": [ "underscore", "jquery" ],
                "exports": "Backbone"  //attaches "Backbone" to the window object
            },
            
            "handlebars" : {
				"deps" : ["jquery"],
				"exports" : "Handlebars"
			},
			
			"underscore": {
            	"exports": "_"
            },
            
            "scrollto"		: ["jquery"],
            "bootstrap"		: ["jquery"],
            "gsap"			: ["jquery", "tweenmax"],
            "akita"			: ["jquery"],
            "helper"		: ["jquery"],
            "plugins"		: ["jquery"],
            "cftoaster"		: ["jquery"],
            "blur"			: ["jquery"],

      } // end Shim Configuration

});

// Includes File Dependencies
require([
	 	
		"jquery",
		"helper",
		"plugins", 
		"backbone",
		"less",
		"bootstrap",
		"gsap",
		"scrollto",
		"controllers/ApplicationController",
	
	], function( $, Helper, Plugins, Backbone, Less, Bootstrap, GSAP, ScrollTo, ApplicationController ) {
	
	$(function() {

		window["controller"] = new ApplicationController();
		
	});	
	
});