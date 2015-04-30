"use strict";
var Branch = {
	init: function(apiKey) {
		Config.setApiKey(apiKey);
		return this;
	},
	urlWithEntity: function() {
		return Config.baseUrl+"/branches";
	},
	apiKey: function() {
		return Config.apiKey;
	},
	getAll: function() {
		var request = $.ajax({ url: this.urlWithEntity(), 
			data: 'key='+this.apiKey(), 
			dataType: 'json'});

		request.done(function(results) {
			return results;
		});
	},
	getOne: function(id) {
		var request = $.ajax({ url: this.urlWithEntity()+'/'+id,
			data: 'key='+this.apiKey(),
			dataType: 'json'});
		
		request.done(function(results) {
			return results;
		});
	}
};