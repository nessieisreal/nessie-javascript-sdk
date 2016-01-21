<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['account', 'customer'], function (account, customer) {

	module('Account API - Module');
	test('tests', function() {
		var accounts = account.initWithKey(apikey);
		var customers = customer.initWithKey(apikey);
		var customerId = getFirstCustomerId(customers);
		var accountId = getFirstAccountId(accounts);
		//var accountId = '569ff9543921211200ef22a7';
		//var newCustDetails ="{ \"first_name\": \"Missy\", \"last_name\": \"Elliot\", \"address\": { \"street_number\": \"1\", \"street_name\": \"Capital One Dr.\", \"city\": \"McLean\", \"state\": \"VA\", \"zip\": \"22102\" } }"
		//var customerInfo = "{\"address\": {\"street_number\": \"8020\",\"street_name\": \"Greenroad Dr\",\"city\": \"McLean\",\"state\": \"VA\",\"zip\": \"22102\"}}";

		ok(testGetAccounts(accounts, customerId), 'Test Get all accounts');
		ok(testGetAccountById(accounts, accountId, customerId), 'Test Get account by id');
		//ok(testCustomerById(customers, customerId), 'Test Get customer by id');
		//ok(testCustomerByAcctId(customers, accountId, customerId), 'Test Get customer that owns the specified account');
		//ok(testUpdateCustomer(customers, customerId, customerInfo), 'Test Update a specific existing customer');
	});
});

function testGetAccounts(accounts, customerId) {
	var res = accounts.getAllAccounts();
	return equals(res[0].customer_id, customerId) || equals(res.length, 0);
}

function testGetAccountById(accounts, accountId, customerId) {
	var res = accounts.getAccountById(accountId);
	return equals(res.customer_id, customerId) || equals(res.length, 0);
}








function testCreateCustomer(customers, newCustDetails) {
	var respCode = customers.createCustomer(newCustDetails);
	return respCode == 201;
}

function testCustomerById(customers, customerId) {
	var cFirstName = customers.getCustomerById(customerId).first_name
	return equals(cFirstName, 'John');
}

function testUpdateCustomer(customers, customerId, customerInfo) {
	var respCode = customers.updateCustomer(customerId, customerInfo);
	return equals(respCode, 202);
}

function testCustomerByAcctId(customers, accountId, customerId) {
	var cID = customers.getCustomerByAcountId(accountId)._id;
	return equals(cID, customerId);
}



function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function getFirstCustomerId(customers) {
	return customers.getCustomers()[0]._id;
}

function equals(val1, val2) {
	return val1 === val2;
}