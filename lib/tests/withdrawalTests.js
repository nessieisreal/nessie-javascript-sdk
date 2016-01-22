<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['withdrawal', 'account'], function (withdrawal, account) {

	module('Withdrawal API - Module');
	test('tests', function() {
		var withdrawals = withdrawal.initWithKey(apikey);
		var accounts = account.initWithKey(apikey);

		var accountID = getFirstAccountId(accounts);
		var withdrawalID = getFirstWithdrawalId(withdrawals, accountID);
		var lastWithdrawID = getLastWithdrawalId(withdrawals, accountID);

		var sampleWithdrawal = "{ \"medium\": \"balance\", \"transaction_date\": \"2016-01-22\", \"status\": \"completed\", \"amount\": 25, \"description\": \"Teller withdrawal\" }";
		var sampleWithdrawUpdate = '{ "medium": "balance", "amount": 52000, "description": "update" }';

		ok(testGetAllByAcctId(withdrawals, accountID), 'Test Get all withdrawals');
		ok(testGetWithdrawalById(withdrawals, withdrawalID), 'Test Get withdrawal by id');
		ok(testCreateWithdrawal(withdrawals, accountID, sampleWithdrawal), 'Test Create a withdrawal');
		ok(testUpdateWithdrawal(withdrawals, withdrawalID, sampleWithdrawUpdate), 'Test Update a specific existing withdrawal');
		ok(testDeleteWithdrawal(withdrawals, lastWithdrawID), 'Test Delete a specific existing withdrawal');

	});
});

function testGetAllByAcctId(withdrawals, accountID) {
	var res = withdrawals.getAllByAccountId(accountID);
	if (res.length > 0) {
		return equals(res[0].payer_id, accountID);
	}
	return false;
}

function testGetWithdrawalById(withdrawals, withdrawalID) {
	var res = withdrawals.getWithdrawalById(withdrawalID);
	return equals(res._id, withdrawalID);
}

function testCreateWithdrawal(withdrawals, accountID, sampleWithdrawal) {
	var respCode = withdrawals.createWithdrawal(accountID, sampleWithdrawal);
	return equals(respCode, 201);
}

function testUpdateWithdrawal(withdrawals, withdrawalID, sampleWithdrawUpdate) {
	var respCode = withdrawals.updateWithdrawalById(withdrawalID, sampleWithdrawUpdate);
	return equals(respCode, 202);
}

function testDeleteWithdrawal(withdrawals, withdrawalID) {
	var respCode = withdrawals.deleteWithdrawals(withdrawalID);
	return equals(respCode, 204); 
}

function getFirstWithdrawalId(withdrawals, accountID) {
	return withdrawals.getAllByAccountId(accountID)[0]._id;
}

function getLastWithdrawalId(withdrawals, accountID) {
	return withdrawals.getAllByAccountId(accountID).pop()._id;
}

function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function equals(val1, val2) {
	return val1 === val2;
}