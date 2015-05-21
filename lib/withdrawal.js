define('withdrawal', function (require) {
    "use strict";
 	var Config = require('capital_one');

    var Withdrawal = {
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
				url: this.urlWithEntity()+'/'+accID+'/withdrawals',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				account = results.responseJSON;
			});
			return account;
		},
		getOneByAccountIdWithdrawalId: function(accID, withdrawalID) {
			var accounts;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/withdrawals/'+withdrawalID,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				accounts = results.responseJSON;
			});
			return accounts;
		},
		createWithdrawal: function(toAcc, json) {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+'/'+toAcc+'/withdrawals?key='+this.apiKey(),
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
		deleteTransaction: function(accID, withdrawalID)  {
			var respCode;
			var request = $.ajax({ 
					url: this.urlWithEntity()+'/'+accID+'/withdrawals/'+withdrawalID,
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
