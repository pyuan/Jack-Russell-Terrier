define([
		
		"jquery", 
		"backbone",
		"handlebars",
		"models/Constants",
		
	], function($, Backbone, Handlebars, Constants) {

	var TemplateUtils = Backbone.Model.extend({},
	
	{
		
		/**
		 * process a handlebar template
		 * @param template, name string to the template without the extension
		 * @param params, object to process the handlebar template
		 * @param onTemplateHandler, function to receive the post processed html of the template
		 * @param templateIsFullPath, boolean, [optional] specifies if the template param specifies the full path to the template
		 */
		getTemplate: function(template, params, onTemplateHandler, templateIsFullPath)
		{
			$.ajax({
				type: "GET",
				url: templateIsFullPath ? template : Constants.FOLDER_TEMPLATES + template + Constants.EXTENSION_TEMPLATES,
				async: true,
				cache: false,
				dataType: "text",
				success: function(data){
					var template = Handlebars.compile(data);
					var html = params ? template(params) : template({});
					
					if(onTemplateHandler){
						onTemplateHandler(html);
					}
				}
			});	
		},
			
	});

	return TemplateUtils;

}); 