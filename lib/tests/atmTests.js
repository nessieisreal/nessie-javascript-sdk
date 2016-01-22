<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['atm'], function (atm) {

	module('ATM API - Module');
	test('tests', function() {
		var atms = atm.initWithKey(apikey);
		var atmID = getFirstATMId(atms);

		ok(testGetAllATM(atm), 'Test Get all accounts');
		ok(testGetATMById(atm, atmID), 'Test Get ATM by id');
	});
});

function testGetAllATM(atms) {
	var res = atms.getAll().data;
	return res.length > 0;
}

function testGetATMById(atms, atmID) {
	var res = atms.getATM(atmID)._id;
	return equals(res, atmID);
}

function getFirstATMId(atms) {
	return atms.getAll().data[0]._id;
}

function equals(val1, val2) {
	return val1 === val2;
}