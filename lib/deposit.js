define('deposit', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Deposit = {
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
				url: this.urlWithEntity()+'/'+accID+'/deposits',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				account = results.responseJSON;
			});
			return account;
		},
		getOneByAccountIdDepositId: function(accID, depositID) {
			var accounts;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/deposits/'+depositID,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		createDeposit: function(toAcc, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+'/'+toAcc+'/deposits?key='+this.apiKey(),
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
		deleteDeposit: function(accID, depositID) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+'/'+accID+'/deposits/'+depositID,
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
