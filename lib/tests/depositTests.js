<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['deposit', 'account'], function (deposit, account) {

	module('Deposit API - Module');
	test('tests', function() {
		var deposits = deposit.initWithKey(apikey);
		var accounts = account.initWithKey(apikey);
		var accountID = getFirstAccountId(accounts);

		var sampleDeposit = "{\"medium\": \"balance\",\"amount\": 100000,\"description\": \"test\"}";
		var sampleDepositUpdate = "{\"medium\": \"balance\",\"amount\": 205000,\"description\": \"test\"}";

		ok(testCreateDeposit(deposits, accountID, sampleDeposit), 'Test Create a deposit');

		var depositID = getFirstDepositId(deposits, accountID);
		var lastDepositId = getLastDepositId(deposit, accountID);
		ok(testGetAllDepositsByAcctId(deposits, accountID), 'Test Get all deposits');
		ok(testGetDepositById(deposits, depositID), 'Test Get deposit by id');
		
		ok(testUpdateDeposit(deposits, depositID, sampleDepositUpdate), 'Test Update a specific existing deposit');
		ok(testDeleteDeposit(deposits, depositID), 'Test Delete a specific existing deposit');
	});
});


function testGetAllDepositsByAcctId(deposits, accountID) {
	var res = deposits.getAllByAccountId(accountID);
	if (res.length > 0) {
		return equals(res[0].payee_id, accountID);
	} else {
		return false;
	}
}

function testGetDepositById(deposits, depositID) {
	var res = deposits.getDepositById(depositID)._id;
	return equals(res, depositID);
}

function testCreateDeposit(deposits, accountID, sampleDeposit) {
	var respCode = deposits.createDeposit(accountID, sampleDeposit);
	return equals(respCode, 201);
}

function testUpdateDeposit(deposits, depositID, sampleDepositUpdate) {
	var respCode = deposits.updateDeposit(depositID, sampleDepositUpdate);
	return equals(respCode, 202);
}

function testDeleteDeposit(deposits, depositID) {
	var respCode = deposits.deleteDeposit(depositID);
	return equals(respCode, 200);
}

function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function getFirstDepositId(deposits, accountID) {
	var res = deposits.getAllByAccountId(accountID)[0];
	return res._id;
}

function getLastDepositId(deposits, accountID) {
	return deposits.getAllByAccountId(accountID).pop()._id;
}

function equals(val1, val2) {
	return val1 === val2;
}