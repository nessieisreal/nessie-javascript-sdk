define('atm', function (require) {
    "use strict";
 	var Config = require('capital_one');

	var Atm = {
		initWithKey: function(apiKey) {
			Config.setApiKey(apiKey);
			return this;
		},
		UrlWithEntity: function() {
			return Config.baseUrl+"/atms/";
		},
		apiKey: function() {
			return Config.apiKey;
		},
		/**
		  # @Method: getAll
		  # @Returns all ATMs as an array of JSON Objects.
		**/
		getAll: function() {
			var atms;
			var request = $.ajax({ url: this.UrlWithEntity(), 
				data: 'key='+this.apiKey(), 
				async: false,
				dataType: 'json'});

			request.complete(function(results) {
				atms = results.responseJSON;
			});
			return atms;
		},
		/**
    	  # @Method: getOne
    	  # @Brief: Gets one ATM for a given ID
    	  # @Parameters: AtmId
    	  # @Returns the ATM that has the given ID. 
		**/
		getATM: function(id) {
			var atm;
			var request = $.ajax({ url: this.UrlWithEntity()+id,
				data: 'key='+this.apiKey(),
				async: false,
				dataType: 'json'});
			
			request.complete(function(results) {
				atm = results.responseJSON;
			});
			return atm;
		},
		/**
		  # @Method: getAllByLocation
		  # @Brief: Get all ATMs withing a certain radius of a geocoordinate
		  # @Paremeters: latitude, longitude, radius
		  # @Note: Accepts lat, lng, and rad as floats
		  # @Returns an array of JSON Objects within the radius of the geocoordinate.  Each hash has an ATM.
		**/
		getAtmByLocation: function(lat, lng, rad) {
			var atm;
			var request = $.ajax({ url: this.UrlWithEntity(),
				data: {'key': this.apiKey(), 'lat': lat, 'lng': lng, 'rad': rad},
				async: false,
				dataType: 'json'});
			
			request.complete(function(results) {
				atm = results.responseJSON;
			});
			return atm;
		}
	};
	return Atm;
});