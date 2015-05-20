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
			var customers;
			var request = $.ajax({ 
				url: this.urlWithEntity(), 
				data: 'key='+this.apiKey(), 
				async: false,
				dataType: 'json'
			});

			request.done(function(results) {
				customers = results;
			});
			return customers;
		},
		getOne: function(custId) {
			var customer;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+custId,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			
			request.done(function(results) {
				customer = results;
			});
			return customer;
		},
		getOneByAcountId: function(accId) {
			var customer;
			var request = $.ajax({ 
				url: this.urlWithAcctEntity()+'/'+accId,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			
			request.done(function(results) {
				customer = results;
			});
			return customer;
		},
		updateCustomer: function(custId, customer) {
			var respCode;
			var request = $.ajax({
				url: this.urlWithEntity()+'/'+custId+'?key='+this.apiKey(),
				data: customer,
				contentType: 'application/json',
				async: false,
				type: 'PUT'
			});

			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
	};
	return Customer;
});