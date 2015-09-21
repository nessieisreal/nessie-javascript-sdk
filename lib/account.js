define('account', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Account = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/accounts/';
		},
		urlWithCustomerEntity: function() {
			return Config.baseUrl+'/customers/';
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getAllAccounts
		  # @Brief: Each index in the array is the JSON object of an individual customer.
		  # @Returns an array of JSON objects getting all the customers. 
		**/
		getAllAccounts: function() {
			var accounts;
			var request = $.ajax({ 
				url: this.urlWithEntity(), 
				data: 'key='+this.apiKey(), 
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		/**
		  # @Method: getAllByType
		  # @Brief: Gets all accounts of a given type.
		  # @Parameters: type
		  # @Note: Accepts a string of the account type. 3 possbilities: Credit Card, Savings, Checking.
		  # @Returns an array of JSON objects with the accounts.
		**/
		getAllByType: function(type) {
			var accounts;
			var request = $.ajax({ 
				url: this.urlWithEntity(),
				data: {'type': type, 'key': this.apiKey()},
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		/**
		  # @Method: getAccountById
		  # @Brief: Returns the account specified by its account ID.
		  # @Parameters: AccountId
		  # @Note: Accepts a string of the account ID. 
		  # @Returns a JSON object with the account info.
		**/
		getAccountById: function(id) {
			var account;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});
			
			request.complete(function(results) {
				account = results.responseJSON;
			});
			return account;
		},
		/**
		  # @Method: getAllByCustomerId
		  # @Parameters: CustomerId
		  # @Note: Accepts a string of the customer ID
		  # @Returns all accounts associated with a given customer ID as an array of JSON objects.
		**/
		getAllByCustomerId: function(customerId) {
				var accounts;
			var request = $.ajax({ 
				url: this.urlWithCustomerEntity()+customerId+'/accounts',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		/**
		  # @Method: updateAccount
		  # @Brief: Updates an account's nickname.
		  # @Parameters: AccountID, Accountobject
		  # @Returns the http response code.
		**/ 
		updateAccount: function(accountId, account) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+accountId+'?key='+this.apiKey(),
					data: JSON.parse(account),
					async: false,
					type: 'PUT' 
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}, 
		/**
		  # @Method: createAccount
		  # @Brief: Creates a new account
		  # @Parameters: CustomerID, accountobject
		  # @Returns the http response code. 
		**/
		createAccount: function(custID, account) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithCustomerEntity()+custID+'/accounts?key='+this.apiKey(),
					data: account,
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
		  # @Method: deleteAccount
		  # @Brief: delete a given account by accountId.
		  # @Parameters: AccountId.
		  # @Returns the http response code. 
		**/
		deleteAccount: function(accountId)  {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+accountId+'?key='+this.apiKey(),
					async: false,
					type: 'DELETE'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
	};
    return Account;
});
