require.config({
    baseUrl: 'lib/',
     bundles: {
        'main': ['capital_one', 'account', 'atm', 'branch']
    }
});

require(['account', 'atm', 'branch']);

define('capital_one', function() {
	"use strict";
	var Config = {
		baseUrl: 'http://api.reimaginebanking.com:80',
		apiKey: function() {
			return this.apiKey;
		},
		setApiKey: function(apiKey) {
			this.apiKey = apiKey;
		}
	};
	return Config;
});
