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
			return Config.baseUrl+"/accounts";
		},
		apiKey: function() {
			return Config.apiKey;
		},
		getAllBillsByAccountId: function(accID) {
			var bills;
			var request = $.ajax({ 
				url: this.urlWithEntity()+'/'+accID+'/bills',
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'
			});

			request.complete(function(results) {
				bills = results.responseJSON;
			});
			return bills;
		}
	};
    return Bills;
});