define([
	
	"jquery", 
	"backbone",
	
], function($, Backbone){
	
	var Utils = Backbone.Model.extend({},
	
	{
		
		/**
		 * convert currency to a number
		 * @param currency, string
		 * @return value, number
		 */
		convertCurrencyToNumber: function(currency)
		{
			var value = 0;
			var isNegative = currency.indexOf("(") != -1;
			currency = currency.replace("$", "");
			currency = currency.replace(/[(),]/g, "");
			if(!isNaN(currency)){
				value = Number(currency);
			}
			
			if(isNegative){
				value *= -1;
			}
			return value;
		},
		
		/**
		 * convert a number to a currency string with $ symbol prefix, thousand place separaters and precision to two decimal places
		 * @param number, Number
		 * @param includeDollarSign, boolean [optional] default is true
		 * @return currency, string
		 */
		convertNumberToCurrency: function(number, includeDollarSign)
		{
			if(includeDollarSign == undefined) {
				includeDollarSign = true;
			}
			
			if(isNaN(number)){
				return (includeDollarSign ? "$" : "") + "0.00";
			}
			
			//round off the number to max two decimal places
			number = Math.round(number * 100) / 100;
			var decimals = number - Math.floor(number);
			number = Math.floor(number);
				
			var isNegative = number < 0;
			var currency = String(number).replace(/\-/g, "").split("").reverse().join("").replace(/(.{3}\B)/g, "$1,").split("").reverse().join("");
			
			if(decimals > 0){
				var temp = String(Math.round(decimals * 100));
				currency += "." + (temp.length == 1 ? "0" : "") + temp;
			}
			
			if(currency.indexOf(".") == -1) {
				currency += ".00";
			}
			
			if(isNegative){
				currency = "(" + currency + ")";
			}
			
			if(!includeDollarSign) {
				currency = currency.replace(/$/g, "");
			}
			
			return currency;
		},
		
		/**
		 * convert meters to miles
		 * @param meters, number
		 * @return miles, number
		 */
		convertMetersToMiles: function(meters)
		{
			var miles = meters * 0.000621371192;
			return miles;
		},
        
        /**
         * force a number to be double digits if it's not
         * @param num
         * @return numString
         */
        forceDoubleDigits: function(num)
        {
        	var numString = String(num);
        	if(numString.length < 2) {
        		numString = "0" + numString;
        	}
        	return numString;
        },
		
		/**
		 * load a css file by appending it into the head
		 * deprecated, using Modernizr.load instead
		 * @param file, path to the file
		 */
		loadCSSFile: function(file)
		{
			$("head").append("<link>");
		    var css = $("head").children(":last");
		    css.attr({
		    	rel:  "stylesheet",
				type: "text/css",
		    	href: file
		    });
		},
		
		/**
		 * convert inches to a feet string
		 * @param length, int
		 * @return lenString, string
		 */
		convertInchesToFeet: function(length)
		{
			var feet = Math.floor(length/12);
			var inches = length - (feet * 12);
			var lenString = feet + "'" + inches + "\""; 
			return lenString;
		},
		
		/**
		 * convert date to a readable string
		 * @param date, Date object
		 * @return dateStr, string
		 */
		convertDateToString: function(date)
		{
			var dateStr = Utils.forceDoubleDigits((date.getMonth()+1)) + "/" + 
				Utils.forceDoubleDigits(date.getDate()) + "/" + date.getFullYear();
			return dateStr;
		},
		
		/**
		 * clean up the string that has a plus sign
		 * @param str, string with plus signs instead of spaces
		 * @return str, string with plus signs replaced with spaces
		 */
		replacePlusSigns: function(str) {
			str = str.replace(/[+]/g, " ");
			return str;
		},
			
	});

	return Utils;

}); 








