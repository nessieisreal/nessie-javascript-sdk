define('purchase', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Purchase = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/purchases/';
		},
		urlWithAccountEntity: function() {
			return Config.baseUrl+'/accounts/';
		},
		urlWithMerchantEntity: function() {
			return Config.baseUrl+'/merchants/';
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getAll
		  # @Parameters: Account Id
		  # @Returns all Purchases as an array of JSON Objects
		**/
		getAll: function(id) {
			var purchases;
			var request = $.ajax({ 
				url: this.urlWithAccountEntity()+id+'/purchases',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			request.complete(function(results) {
				purchases = results.responseJSON;
			});
			return purchases;
		},
		/**
		  # @Method: getAllByAcctAndMerchant
		  # @Parameters: Account Id, Merchant Id
		  # @Returns all Purchases as an array of JSON Objects
		**/
		getAllByAcctAndMerchant: function(accID, merchantID) {
			var purchases;
			var request = $.ajax({ 
				url: this.urlWithMerchantEntity()+merchantID+'/accounts/'+accID+'/purchases',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			request.complete(function(results) {
				purchases = results.responseJSON;
			});
			return purchases;
		},
		/**
		  # @Method: getAllByMerchant
		  # @Parameters: Merchant Id
		  # @Returns all Purchases as an array of JSON Objects
		**/
		getAllByMerchant: function(merchantID) {
			var purchases;
			var request = $.ajax({ 
				url: this.urlWithMerchantEntity()+merchantID+'/purchases',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			request.complete(function(results) {
				purchases = results.responseJSON;
			});
			return purchases;
		},
		/**
		  # @Method: getPurchase
		  # @Brief: Returns a purchase for a given ID
		  # @Parameters: PurchaseId
		  # @Returns a JSON Object
		**/
		getPurchase: function(id) {
			var purchase;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});
			request.complete(function(results) {
				purchase = results.responseJSON;
			});
			return purchase;
		},
		/**
		  # @Method: createPurchase
		  # @Brief: Creates a new purchase for a given account
		  # @Parameters: AccountId, Purchaseobject
		  # @Note: Purchaseobject is formatted as follows:
		  # {
		  # 	"merchant_id": "string",
		  # 	"medium": "balance",
		  # 	"purchase_date": "string",
		  # 	"amount": 0,
		  # 	"status": "pending",
		  # 	"description": "string"
		  # }
		  # @Returns http response code
		**/
		createPurchase: function(accID, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithAccountEntity()+accID+'/purchases?key='+this.apiKey(),
					data: json,
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
		  # @Method: updatePurchase
		  # @Brief: Updates an existing purchase
		  # @Parameters: PurchaseId, Purchaseobject
		  # @Note: Purchaseobject is formatted as follows:
		  # {
		  # 	"merchant_id": "string",
		  # 	"medium": "balance",
		  # 	"purchase_date": "string",
		  # 	"amount": 0,
		  # 	"status": "pending",
		  # 	"description": "string"
		  # }
		  # @Returns http response code
		**/
		updatePurchase: function(id, json) {
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
		},
		/**
		  # @Method: deletePurchase
		  # @Brief: Deletes a purchase for a given ID
		  # @Parameters: PurchaseId
		  # @Returns http response code
		**/
		deletePurchase: function(id) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+id,
					data: 'key='+this.apiKey(),
					async: false,
					dataType: 'json'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
	};
    return Purchase;
});