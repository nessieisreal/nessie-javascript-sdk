define('branch', function (require) {
    "use strict";
 	var Config = require('capital_one');

 	var Branch = {
		initWithKey: function(apiKey) {
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
			var branches;
			var request = $.ajax({ 
				url: this.urlWithEntity(), 
				data: 'key='+this.apiKey(), 
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				branches = results.responseJSON;
			});
			return branches;
		},
		getOne: function(id) {
			var branch;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			
			request.complete(function(results) {
				branch = results.responseJSON;
			});
			return branch;
		}
	};
	return Branch;
});