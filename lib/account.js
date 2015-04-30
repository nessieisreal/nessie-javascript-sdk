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
		var request = $.ajax({ url: this.urlWithEntity(), 
			data: 'key='+this.apiKey(), 
			dataType: 'json'});

		request.done(function(results) {
			return results;
		});
	},
	getAllByType: function(type) {
		var request = $.ajax({ url: this.urlWithEntity(),
			data: {'type': type, 'key': this.apiKey()},
			dataType: 'json'});

		request.done(function(results) {
			return results;
		});
	},
	getOne: function(id) {
		var request = $.ajax({ url: this.urlWithEntity()+'/'+id,
			data: 'key='+this.apiKey(),
			dataType: 'json'});
		
		request.done(function(results) {
			return results;
		});
	},
	getAllByCustomerId: function(customerId) {
		var request = $.ajax({ url: Config.baseUrl+'/customers/'+customerId+'/accounts',
			data: 'key='+this.apiKey(),
			dataType: 'json'});

		request.done(function(results) {
			return results;
		});
	}, 
	updateAccount: function(accountId, account) {
		var resquest = $.ajax({ url: this.urlWithEntity()+'/'+accountId,
				data: {'key': this.apiKey(), 'account': account},
				type: 'PUT' 
			});
		request.complete(function(jqXHR, textStatus) {
			return jqXHR.statusCode();
		});
	},
	createAccount: function(custID, account) {
		var request = $.ajax{( url : Config.baseUrl+'/customers/'+custID+'/accounts',
				data: {'key': this.apiKey(), 'account': JSON.parse(account)},
				contentType: 'application/json',
				type: 'POST'
			)};
		request.complete(function(jqXHR, textStatus) {
			return jqXHR.statusCode();
		});
	},
	deleteAccount: function(accountId) {
		var request = $.ajax{( url: this.urlWithEntity()+'/'+accountId,
			data: {'key': this.apiKey()},
			type: 'DELETE'
			)};
		request.complete(function(jqXHR, textStatus) {
			return jqXHR.statusCode();
		});
	}
};