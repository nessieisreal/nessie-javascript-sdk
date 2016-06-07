define('deposit', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Deposit = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/deposits/';
		},
		urlWithAccountEntity: function () {
			return Config.baseUrl+'/accounts/'
		},
		url: function() {
			return Config.baseUrl;
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/** 
		  # @Method: getAllByAccountId
		  # @Brief: Get all deposits for a specific account
		  # @Parameters: AccountID
		  # @Returns an array of JSON Objects containing the deposits for that account.
		**/
		getAllByAccountId: function(accID) {
			var account;
			var request = $.ajax({ 
				url: this.urlWithAccountEntity()+accID+'/deposits',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				account = results.responseJSON;
			});
			return account;
		},
		/**
		  # @Method: getDepositById
		  # @Brief: Returns a deposit for a given Deposit ID
		  # @Parameters: DepositId
		  # @Returns a JSON Object with the deposit data
		**/
		getDepositById: function(id)  {
			var deposit;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				deposit = results.responseJSON;
			});
			return deposit;
		},
		/**
		  # @Method: createDeposit
		  # @Brief: Creates a new deposit.
		  # @Parameters: toAccountId, Depositobject
		  # @Note: Depositobject is formatted as follows: 
		  # {
		  #   "medium": "balance",
		  #   "transaction_date": "string",
		  #   "status": "pending",
		  #   "amount": 0,
		  #   "description": "string"
		  # }
		  # @Returns http response code. 
		**/
		createDeposit: function(toAcc, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithAccountEntity()+toAcc+'/deposits?key='+this.apiKey(),
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
		   # @Method: updateDeposit
		   # @Brief: Updates an existing deposit
		   # @Parameters: DepositId, Depositobject
		   # @Object: Depositobject is formatted as follows: 
		   # {
		   #   "medium": "balance",
		   #   "transaction_date": "string",
		   #   "status": "pending",
		   #   "amount": 0,
		   #   "description": "string"
		   # }
		   # @Returns http response code
		**/
		updateDeposit: function(id, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+id+'/?key='+this.apiKey(),
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
		  # @Method: deleteDeposit
		  # @Brief: Deletes an existing deposit
		  # @Parameters: DepositId
		  # @Returns http response code
		**/
		deleteDeposit: function(id) {
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
    return Deposit;
});
