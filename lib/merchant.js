define('merchant', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Merchant = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/merchants/';
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getAll
		  # @Returns all Merchants as an array of JSON Objects
		**/
		getAll: function() {
			var merchants;
			var request = $.ajax({ 
				url: this.urlWithEntity(),
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				merchants = results.responseJSON;
			});
			return merchants;
		},
		/**
		  # @Method: getMerchant
		  # @Returns a single merchant for a given ID
		  # @Parameters: MerchantId
		  # @Returns a JSON Object
		**/
		getMerchant: function(id) {
			var merchant;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				merchant = results.responseJSON;
			});
			return merchant;
		},
		/**
		  # @Method: createMerchant
		  # @Brief: Creates a new Merchant
		  # @Parameters: Merchantobject
		  # @Note: Merchantobject format is as follows: 
		  # 	{
		  # 		"name": "string",
		  # 		"address": {
		  # 			"street_number": "string",
		  # 			"street_name": "string",
		  # 			"city": "string",
		  # 			"state": "string",
		  # 			"zip": "string",
		  #		},
		  # 		"geocode": {
		  # 			"lat": 0,
		  # 			"lng": 0,
		  # 		}
		  # 	}
		  # @Returns http response code
		**/
		createMerchant: function(merchant) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+'?key='+this.apiKey(),
					data: merchant,
					contentType: 'application/json',
					async: false,
					type: 'POST'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		},
		/**
		  # @Method: updateMerchant
		  # @Brief: Updates an existing Merchant
		  # @Parameters: MerchantId, Merchantobject
		  # @Note: Merchantobject format is as follows: 
		  # 	{
		  # 		"name": "string",
		  # 		"address": {
		  # 			"street_number": "string",
		  # 			"street_name": "string",
		  # 			"city": "string",
		  # 			"state": "string",
		  # 			"zip": "string",
		  #		},
		  # 		"geocode": {
		  # 			"lat": 0,
		  # 			"lng": 0,
		  # 		}
		  # 	}
		  # @Returns http response code
		**/
		updateMerchant: function(id, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+id+'?key='+this.apiKey(),
					data: json,
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
    return Merchant;
});
