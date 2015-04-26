
require(jquery/jquery-2.1.3.min.js);

var Config = (function(){
	var settings = {},
		baseUrl = 'http://api.reimaginebanking.com:80';
	
	settings.setApiKey = function(apiKey) {
		this.apiKey = apiKey;
	};
	return settings;
}(Config));