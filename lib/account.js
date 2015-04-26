
require(capital_one.js);

var Account = (function() {
	var ConfigHelper;
	init: function(apiKey) {
		ConfigHelper = new Config();
		ConfigHelper.setApiKey(apiKey);
	},
	var urlWithEntity = function() {
		return ConfigHelper.url+"/accounts";
	},
	var url = function() {
		return ConfigHelper.baseUrl;
	},
	var apiKey = function() {
		return ConfigHelper.apiKey;
	},
	var getAll = function() {
		var accounts;
		$.ajax({ url: this.urlWithEntity, 
			data: '?key='+this.apiKey, 
			success: function(results){
				accounts = results;
			},
			dataType: json });
		return accounts;
	};
}(Account));