define('bills', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Bills = {
		initWithKey: function(apiKey) {
			console.log(apiKey);
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+'/bills/';
		},
		urlWithAccountEntity: function() {
			return Config.baseUrl+'/accounts/';
		},
		urlWithCustomerEntity: function() {
			return Config.baseUrl+'/customers/';
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getAllByAccountId
		  # @Brief: Get all bills for a specific account
		  # @Parameters: accountId
		  # @Returns an array of objects containing the bills.
		**/
		getAllByAccountId: function(accID) {
			var bills;
			var request = $.ajax({ 
				url: this.urlWithAccountEntity()+accID+'/bills',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				bills = results.responseJSON;
			});
			return bills;
		},
		/**
		  # @Method: getAllByCustomerId
		  # @Brief: Get all bills for a specific customer
		  # @Parameters: customerId
		  # @Returns the customer as a object array.
		**/
		getAllByCustomerId: function(custID) {
			var bills;
			var request = $.ajax({ 
				url: this.urlWithCustomerEntity()+custID+'/bills',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.done(function(results) {
				bills = results;
			});
			return bills;
		},
		/**
		  # @Method: getBill
		  # @Brief: Gets a bill for a specific bill ID
		  # @Parameters: bill ID
		  # @Returns a object with the bill data
		**/
		getBill: function(id) {
			var bill;
			var request = $.ajax({ 
				url: this.urlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				bill = results.responseJSON;
			});
			return bill;
		},
		/**
		  	# @Method: updateBill
		  	# @Brief: Updates an account's information by id with given json data. 
		  	# @Parameters: BillId, BillJson
		  	# Json format is as follows: 
			# 	{
			#   "status": "",
			#   "payee": "",
			#   "nickname": "",
			#   "payment_date": "",
			#   "recurring_date": 0,
			#   "payment_amount": 0
			# }
			# @Returns http response code.
		**/
		updateBill: function(id, json) {
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
		  # @Method: createBill
		  # @Brief: create a new bill on an associated account ID
		  # @Parameters: AccountId, Bill JSON
		  # Json is as follows:
		  # 	{
		  #   "status": "",
		  #   "payee": "",
		  #   "nickname": "",
		  #   "payment_date": "",
		  #   "recurring_date": 0,
		  #   "payment_amount": 0
		  # }
		  # @Returns http response code.
		**/
		createBill: function(accID, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithAccountEntity()+accID+'/bills?key='+this.apiKey(),
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
		  # @Method: deleteBill
		  # @Brief: delete a bill by its id
		  # @Parameters: Bill ID
		  # @Returns http response code
		**/
		deleteBill: function(id)  {
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
    return Bills;
});