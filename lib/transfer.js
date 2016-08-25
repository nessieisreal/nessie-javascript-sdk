define('transfer', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Transfer = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/transfers/';
		},
		urlWithAccountEntity: function() {
			return Config.baseUrl+'/accounts/'
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		   # @Method: getAll
		   # @Brief: Get all transfers for a specific account
		   # @Parameters: AccountID, Type [Optional] (ex. payer or payee)
		   # @Returns an array of JSON Objects containing the transfers for that account.
		**/
		getAll: function(accID, type) {
			var transfers;
			var requestUrl;
			if (typeof type === "undefined" || type === null) { 
				requestUrl = 'key='+this.apiKey(); 
			} else {
				requestUrl = 'type='+type+'&key='+this.apiKey();
			}
			var request = $.ajax({
				url: this.urlWithAccountEntity()+accID+'/transfers',
				data: requestUrl,
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				transfers = results.responseJSON;
			});
			return transfers;
		},
		/**
		  # @Method: getTransferById
		  # @Brief: Get a single transfer for a given ID
		  # @Parameters: TransferId
		  # @Returns a JSON Object
		**/
		getTransferById: function(id) {
			var transfer;
			var request = $.ajax({
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				transfer = results.responseJSON;
			});
			return transfer;
		},
		/**
		  # @Method: createTransfer
		  # @Brief: Creates a new transfer
		  # @Parameters: toAccountId, TransferObject
		  # TransferObject formatted as follows: 
		  # {
		  #   "medium": "balance",
		  #   "payee_id": "string",
		  #   "amount": 0,
		  #   "transaction_date": "string",
		  #   "status": "string",
		  #   "desciption": "string"
		  # }
		  # @Returns http response code
		**/
		createTransfer: function(toAcc, json) {
			var respCode;
			var request = $.ajax({
					url: this.urlWithAccountEntity()+toAcc+'/withdrawals?key='+this.apiKey(),
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
		  # @Method: updateTransfer
		  # @Brief: Updates an existing transfer
		  # @Parameters: transferId, TransferObject
		  # TransferObject formatted as follows: 
		  # {
		  #   "medium": "balance",
		  #	  "payee_id": "string",
		  #   "amount": 0,
		  #   "desciption": "string"
		  # }
		  # @Returns http response code
		**/
		updateTransfer: function(id, json){
			var respCode;
			var request = $.ajax({
				url: this.urlWithEntity()+id+'/?key='+this.apiKey(),
				data: json,
				contentType: 'application/json',
				async: false,
				type: 'PUT'
			});
			request.complete(function(jqXHR, textStatus){
				respCode = jqXHR.status;
			});
			return respCode;
		},
		/**
		   # @Method: deleteTransfer
		   # @Brief: Deletes a specified transfer
		   # @Parameters: transferID
		   # @Returns http response code.
		**/
		deleteTransfer: function(id)  {
			var respCode;
			var request = $.ajax({
					url: this.urlWithEntity()+id+'?key='+this.apiKey(),
					async: false,
					type: 'DELETE'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
	};
    return Transfer;
});
