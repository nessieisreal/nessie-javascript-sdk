"use strict";
var Atm = {
	init: function(apiKey) {
		Config.setApiKey(apiKey);
		return this;
	},
	urlWithEntity: function() {
		return Config.baseUrl+"/atms";
	},
	apiKey: function() {
		return Config.apiKey;
	},
	getAll: function() {
		var atms;
		var request = $.ajax({ url: this.urlWithEntity(), 
			data: 'key='+this.apiKey(), 
			async: false,
			dataType: 'json'});

		request.complete(function(results) {
			atms = results.responseJSON;
		});
		return atms;
	},
	getOne: function(id) {
		var atm;
		var request = $.ajax({ url: this.urlWithEntity()+'/'+id,
			data: 'key='+this.apiKey(),
			async: false,
			dataType: 'json'});
		
		request.complete(function(results) {
			atm = results.responseJSON;
		});
		return atm;
	}
};