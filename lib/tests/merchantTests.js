<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['merchant'], function (merchant) {

	module('Merchant API - Module');
	test('tests', function() {
		var merchants = merchant.initWithKey(apikey);
		var merchantID = getFirstMerchantId(merchants);

		var sampleMerchant = '{ "name": "MVP LLC", "category": ["Residential"], "address": { "street_number": "12095", "street_name": "Oakload Park Ave.", "city": "Arlington", "state": "VA", "zip": "22192" }, "geocode": { "lat": 21, "lng": -10 } }';
		var sampleMerchantUpdate = "{ \"name\": \"Best Productions\", \"category\": [\"Entertainment\"], \"address\": { \"street_number\": \"5901\", \"street_name\": \"Lafayette St.\", \"city\": \"Brooklyn\", \"state\": \"NY\", \"zip\": \"07009\" }, \"geocode\": { \"lat\": 33, \"lng\": -1 } }";

		ok(testGetAllMerchants(merchants), 'Test Get all merchants');
		ok(testGetMerchantById(merchants, merchantID), 'Test Get merchant by id');
		ok(testCreateMerchant(merchants, sampleMerchant), 'Test Create a merchant');
		ok(testUpdateMerchant(merchants, merchantID, sampleMerchantUpdate), 'Test Update a specific existing merchant');
	});
});


function testGetAllMerchants(merchants) {
	var res = merchants.getAll().data;
	if (res.length > 0) {
		return !equals(res[0].name, "");
	}
	return false;
}

function testGetMerchantById(merchants, merchantID) {
	var res = merchants.getMerchant(merchantID)._id;
	return equals(res, merchantID);
}

function testCreateMerchant(merchants, sampleMerchant) {
	var respCode = merchants.createMerchant(sampleMerchant);
	return equals(respCode, 201);
}

function testUpdateMerchant(merchants, merchantID, sampleMerchantUpdate) {
	var respCode = merchants.updateMerchant(merchantID, sampleMerchantUpdate);
	return equals(respCode, 202);
}

function getFirstMerchantId(merchants) {
	return merchants.getAll().data[0]._id;
}

function equals(val1, val2) {
	return val1 === val2;
}