<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['customer'], function (customer) {

	module('Customer API - Module');
	test('tests', function() {
		var customers = customer.initWithKey(apikey);
		var customerId = getFirstCustomerId(customers);
		var accountId = '569ff9543921211200ef22a7';
		var newCustDetails ="{ \"first_name\": \"Missy\", \"last_name\": \"Elliot\", \"address\": { \"street_number\": \"1\", \"street_name\": \"Capital One Dr.\", \"city\": \"McLean\", \"state\": \"VA\", \"zip\": \"22102\" } }"
		var customerInfo = "{\"address\": {\"street_number\": \"8020\",\"street_name\": \"Greenroad Dr\",\"city\": \"McLean\",\"state\": \"VA\",\"zip\": \"22102\"}}";

		ok(testCreateCustomer(customers, newCustDetails), 'Test Create a customer');
		ok(testGetCustomers(customers), 'Test Get all customers');
		ok(testCustomerById(customers, customerId), 'Test Get customer by id');
		ok(testCustomerByAcctId(customers, accountId, customerId), 'Test Get customer that owns the specified account');
		ok(testUpdateCustomer(customers, customerId, customerInfo), 'Test Update a specific existing customer');
	});
});

function testCreateCustomer(customers, newCustDetails) {
	var respCode = customers.createCustomer(newCustDetails);
	return respCode == 201;
}

function testGetCustomers(customers) {
	var res = customers.getCustomers();
	return equals(res[0].first_name, 'John');
}

function testCustomerById(customers, customerId) {
	var cFirstName = customers.getCustomerById(customerId).first_name;
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

function getFirstCustomerId(customers) {
	return customers.getCustomers()[0]._id;
}

function equals(val1, val2) {
	return val1 === val2;
}