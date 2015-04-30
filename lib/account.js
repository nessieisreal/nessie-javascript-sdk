"use strict";
var Account = {
	init: function(apiKey) {
		Config.setApiKey(apiKey);
		return this;
	},
	urlWithEntity: function() {
		return Config.baseUrl+"/accounts";
	},
	apiKey: function() {
		return Config.apiKey;
	},
	getAll: function() {
		var accounts;
		var request = $.ajax({ url: this.urlWithEntity(), 
			data: 'key='+this.apiKey(), 
			async: false,
			dataType: 'json'});

		request.complete(function(results) {
			accounts = results.responseJSON;
		});
		return accounts;
	},
	getAllByType: function(type) {
		var accounts;
		var request = $.ajax({ url: this.urlWithEntity(),
			data: {'type': type, 'key': this.apiKey()},
			async: false,
			dataType: 'json'});

		request.complete(function(results) {
			accounts = results.responseJSON;
		});
		return accounts;
	},
	getOne: function(id) {
		var account;
		var request = $.ajax({ url: this.urlWithEntity()+'/'+id,
			data: 'key='+this.apiKey(),
			async: false,
			dataType: 'json'});
		
		request.complete(function(results) {
			account = results.responseJSON;
		});
		return account;
	},
	getAllByCustomerId: function(customerId) {
		var accounts;
		var request = $.ajax({ url: Config.baseUrl+'/customers/'+customerId+'/accounts',
			data: 'key='+this.apiKey(),
			async: false,
			dataType: 'json'});

		request.complete(function(results) {
			accounts = results.responseJSON;
		});
		return accounts;
	}, 
	updateAccount: function(accountId, account) {
		var respCode;
		var resquest = $.ajax({ url: this.urlWithEntity()+'/'+accountId,
				data: {'key': this.apiKey(), 'account': account},
				async: false,
				type: 'PUT' 
			});
		request.complete(function(jqXHR, textStatus) {
			respCode = jqXHR.status;
		});
		return respCode;
	}, 
	createAccount: function(custID, account) {
		var respCode;
		var resquest = $.ajax({ url: Config.baseUrl+'/customers/'+custID+'/accounts',
				data: {'key': this.apiKey(), 'account': JSON.parse(account)},
				contentType: 'application/json',
				async: false,
				type: 'POST'
			});
		request.complete(function(jqXHR, textStatus) {
			respCode = jqXHR.status;
		});
		return respCode;
	},
	deleteAccount: function(accountId)  {
		var respCode;
		var resquest = $.ajax({ url: his.urlWithEntity()+'/'+accountId,
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