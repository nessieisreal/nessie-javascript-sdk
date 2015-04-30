"use strict";
var Config = {
	baseUrl: 'http://api.reimaginebanking.com:80',
	apiKey: function() {
		return this.apiKey;
	},
	setApiKey: function (apiKey) {
		this.apiKey = apiKey;
	}
};