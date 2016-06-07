<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['account'], function (account) {

	module('Account API - Module');
	test('tests', function() {
		var accounts = account.initWithKey(apikey);
		var customerId = getFirstCustomerId(accounts);
		var accountId = getFirstAccountId(accounts);
		var deleteAccountId = getLastAccountId(accounts);
		var newAcctDetails = "{ \"type\": \"Checking\", \"nickname\": \"Retail Checking Account\", \"rewards\": 0, \"balance\": 2500 }";
		var accountInfo =  "{\"nickname\":\"Mr. Stanislaus's Account\"}";

		ok(testGetAccounts(accounts, customerId), 'Test Get all accounts');
		ok(testGetAccountById(accounts, accountId, customerId), 'Test Get account by id');
		ok(testGetAccountsByCustomerId(accounts, customerId, accountId), 'Test Get accounts by customer id');
		ok(testCreateAccount(accounts, customerId, newAcctDetails), 'Test Create an account');
		ok(testUpdateAccount(accounts, accountId, accountInfo), 'Test Update a specific existing account');
		ok(testDeleteAccount(accounts, deleteAccountId), 'Delete a specific existing account');
	});
});

function testGetAccounts(accounts, customerId) {
	var res = accounts.getAllAccounts();
	return equals(res[0].customer_id, customerId);
}

function testGetAccountById(accounts, accountId, customerId) {
	var res = accounts.getAccountById(accountId);
	return equals(res.customer_id, customerId);
}

function testGetAccountsByCustomerId(accounts, customerId, accountId) {
	var res = accounts.getAllByCustomerId(customerId)[0];
	return equals(res._id, accountId);
}

function testCreateAccount(accounts, customerId, newAcctDetails) {
	var respCode = accounts.createAccount(customerId, newAcctDetails);
	return respCode == 201;
}

function testUpdateAccount(accounts, accountId, accountInfo) {
	var respCode = accounts.updateAccount(accountId, accountInfo);
	return respCode == 202;
}

function testDeleteAccount(accounts, deleteAccountId) {
	var respCode = accounts.deleteAccount(deleteAccountId);
	return respCode == 204;
}

function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function getFirstCustomerId(accounts) {
	return accounts.getAllAccounts()[0].customer_id;
}

function getLastAccountId(accounts) {
	return accounts.getAllAccounts().pop()._id;
}

function equals(val1, val2) {
	return val1 === val2;
}