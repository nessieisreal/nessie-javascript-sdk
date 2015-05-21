define('atm', function (require) {
    "use strict";
 	var Config = require('capital_one');

	var Atm = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		UrlWithEntity: function() {
			return Config.baseUrl+"/atms";
		},
		apiKey: function() {
			return Config.apiKey;
		},
		getAll: function() {
			var atms;
			var request = $.ajax({ url: this.UrlWithEntity(), 
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
			var request = $.ajax({ url: this.UrlWithEntity()+'/'+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});
			
			request.complete(function(results) {
				atm = results.responseJSON;
			});
			return atm;
		},
		getAtmByLocation: function(lat, lng, rad) {
			var atm;
			var request = $.ajax({ url: this.UrlWithEntity(),
				data: {'key': this.apiKey(), 'lat': lat, 'lng': lng, 'rad': rad},
				async: false,
				dataType: 'json'});
			
			request.complete(function(results) {
				atm = results.responseJSON;
			});
			return atm;
		}
	};
	return Atm;
});