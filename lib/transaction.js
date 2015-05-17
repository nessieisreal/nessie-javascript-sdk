define('transaction', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Transaction = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		urlWithEntity: function() {
			return Config.baseUrl+"/accounts";
		},
		apiKey: function() {
			return Config.apiKey;
		},
		getAllByAccountId: function(accID) {
			var account;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/transactions',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				account = results.responseJSON;
			});
			return account;
		},
		getAllByAccountIdPayer: function(accID) {
			var accounts;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/transactions',
				data: {'key': this.apiKey(), 'type': 'payer'},
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		getAllByAccountIdPayee: function(accID) {
			var accounts;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/transactions',
				data: {'key': this.apiKey(), 'type': 'payee'},
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		getOneByAccountIdTransactionId: function(accID, transID) {
			var account;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/transactions/'+transID,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				account = results.responseJSON;
			});
			return account;
		},
		createTransaction: function(toAcc, json) {
			var respCode;
			var resquest = $.ajax({ 
					url: this.urlWithEntity()+'/'+toAcc+'/transactions/',
					data: {'key': this.apiKey(), 'json': JSON.parse(json)},
					contentType: 'application/json',
					async: false,
					type: 'POST'
				});
			request.complete(function(jqXHR, textStatus) {
				respCode = jqXHR.status;
			});
			return respCode;
		},
		deleteTransaction: function(accID, transID)  {
			var respCode;
			var resquest = $.ajax({ 
					url: this.urlWithEntity()+'/'+accID+'/transactions/'+transID,
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
    return Transaction;
});
