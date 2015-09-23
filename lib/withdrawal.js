define('withdrawal', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Withdrawal = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/withdrawals/';
		},
		urlWithAccountEntity: function() {
			return Config.baseUrl+'/accounts/'
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		   # @Method: getAllByAccountId
		   # @Brief: Get all withdrawals for a specific account
		   # @Parameters: AccountID
		   # @Returns an array of JSON Objects containing the withdrawals for that account.
		**/
		getAllByAccountId: function(accID) {
			var withdrawals;
			var request = $.ajax({
				url: this.urlWithAccountEntity()+accID+'/withdrawals',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				withdrawals = results.responseJSON;
			});
			return withdrawals;
		},
		/**
		  # @Method: getWithdrawalById
		  # @Brief: Get a single withdrawal for a given ID
		  # @Parameters: WithdrawalId
		  # @Returns a JSON Object
		**/
		getWithdrawalById: function(id) {
			var withdrawal;
			var request = $.ajax({
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				withdrawal = results.responseJSON;
			});
			return withdrawal;
		},
		/**
		  # @Method: createWithdrawal
		  # @Brief: Creates a new withdrawal
		  # @Parameters: toAccountId, Withdrawalobject
		  # Withdrawalobject formatted as follows: 
		  # {
		  #   "medium": "balance",
		  #   "transaction_date": "string",
		  #   "status": "pending",
		  #   "amount": 0,
		  #   "desciption": "string"
		  # }
		  # @Returns http response code
		**/
		createWithdrawal: function(toAcc, json) {
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
		  # @Method: updateWithdrawal
		  # @Brief: Updates an existing withdrawal
		  # @Parameters: WithdrawalId, Withdrawalobject
		  # Withdrawalobject formatted as follows: 
		  # {
		  #   "medium": "balance",
		  #   "transaction_date": "string",
		  #   "status": "pending",
		  #   "amount": 0,
		  #   "desciption": "string"
		  # }
		  # @Returns http response code
		**/
		updateWithdrawalById: function(id, json){
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
		   # @Method: deleteWithdrawal
		   # @Brief: Deletes a specified withdrawal from a specified account.
		   # @Parameters: WithdrawalID
		   # @Returns http response code.
		   # @Note: This does not actually delete the withdrawal from the database, it only sets its status to 'cancelled'
		**/
		deleteWithdrawals: function(id)  {
			var respCode;
			var request = $.ajax({
					url: this.urlWithEntity()+id,
					data: {'key': this.apiKey()},
					async: false,
					type: 'DELETE'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		}
	};
    return Withdrawal;
});
