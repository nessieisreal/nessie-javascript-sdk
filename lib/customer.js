define('customer', function (require) {
    "use strict";
    var Config = require('capital_one');
    
	var Customer = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+"/customers";
		},
		urlWithAcctEntity: function() {
			return Config.baseUrl+"/accounts";
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
		getOne: function(custId) {
			var request = $.ajax({ url: this.urlWithEntity()+'/'+custId,
				data: 'key='+this.apiKey(),
				dataType: 'json'});
			
			request.done(function(results) {
				return results;
			});
		},
		getOneByAcountId: function(accId) {
			var request = $.ajax({ url: this.urlWithAcctEntity()+'/'+accId,
				data: 'key='+this.apiKey(),
				dataType: 'json'});
			
			request.done(function(results) {
				return results;
			});
		}
	};
	return Customer;
});