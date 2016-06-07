<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['bills', 'account', 'customer'], function (bills, account, customer) {

	module('Bill API - Module');
	test('tests', function() {
		var bill = bills.initWithKey(apikey);
		var accounts = account.initWithKey(apikey);
		var customers = customer.initWithKey(apikey);
		var accountID = getFirstAccountId(accounts);
		
		var customerId = getFirstCustomerId(customers);

		var sampleBill = "{\"status\": \"pending\",\"payee\": \"Verizon\",\"nickname\": \"Cable/Internet\",\"payment_date\": \"2015-09-18\", \"recurring_date\": 15, \"payment_amount\": 50 }";
		var sampleBillUpdate = "{\"status\": \"cancelled\",\"payee\": \"Verizon\",\"nickname\": \"Cable/Internet\",\"payment_date\": \"2015-09-18\", \"recurring_date\": 1, \"payment_amount\": 30 }";

		
		ok(testCreateBill(bill, accountID, sampleBill), 'Test Create a bill');

		var billId = getFirstBillId(bill, accountID);
		ok(testGetAllBillsByAcctId(bill, accountID), 'Test Get all bills for a specific account');
		ok(testGetBillById(bill, billId), 'Test Get bill by id');
		ok(testGetBillsByCustId(bill, customerId), 'Test Get bills by customer id');

		ok(testUpdateBill(bill, billId, sampleBillUpdate), 'Test Update a specific existing bill');

		var lastBillId = getLastBillId(bill, accountID);
		ok(testDeleteBill(bill, lastBillId), 'Test Delete a specific existing bill');
	});
});


function testGetAllBillsByAcctId(bill, accountID) {
	var res = bill.getAllByAccountId(accountID);
	if (res.length > 0) {
		return equals(res[0].account_id, accountID);
	} else {
		return false;
	}
}

function testGetBillById(bill, billId) {
	var res = bill.getBill(billId)._id;
	return equals(res, billId);
}

function testGetBillsByCustId(bill, customerId) {
	var res = bill.getAllByCustomerId(customerId)[0].nickname;
	return !equals(res, "");
}

function testCreateBill(bill, accountID, sampleBill) {
	var respCode = bill.createBill(accountID, sampleBill);
	return equals(respCode, 201);
}

function testUpdateBill(bill, billId, sampleBillUpdate) {
	var respCode = bill.updateBill(billId, sampleBillUpdate);
	return equals(respCode, 202);
}

function testDeleteBill(bill, billId) {
	var respCode = bill.deleteBill(billId);
	return equals(respCode, 204);
}

function getFirstBillId(bill, accountID) {
	return bill.getAllByAccountId(accountID)[0]._id;
}

function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function getFirstCustomerId(customers) {
	return customers.getCustomers()[0]._id;
}

function getLastBillId(bill, accountID) {
	return bill.getAllByAccountId(accountID).pop()._id;
}

function equals(val1, val2) {
	return val1 === val2;
}