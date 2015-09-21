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
		/**
		  # @Method: getAll
		  # @Returns all Branches as an array of JSON Objects
		**/
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
		/**
		  # @Method: getBranch
		  # @Brief: Gets a branch for a specific branch ID
		  # @Parameters: branch ID
		  # @Returns a object with the branch data
		**/
		getBranch: function(id) {
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