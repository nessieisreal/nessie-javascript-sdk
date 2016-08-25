<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['transfer', 'account'], function (transfer, account) {

	module('Transfer API - Module');
	test('tests', function() {
		var transfers = transfer.initWithKey(apikey);
		var accounts = account.initWithKey(apikey);
		var paymentType = ["payer", "payee"];

		var accountID = getFirstAccountId(accounts);
		ok(testGetAllTransfers(transfers, accountID), 'Test Get all transfers');
		var sampleTransfer = "{ \"medium\": \"balance\", \"payee_id\": \""+accountID+"\", \"amount\": 4525, \"transaction_date\": \"2016-01-22\", \"status\": \"pending\", \"description\": \"Transfer - Savings\" }";

		var transferID = getFirstTransferId(transfers, accountID, paymentType[0]);
		ok(testTransferById(transfers, transferID), 'Test Get transfer by id');
		ok(testCreateTransfer(transfers, accountID, sampleTransfer), 'Test Create a transfer');

		var lastAccountID = getLastAccountId(accounts);
		var sampleTransferUpdate = "{ \"medium\": \"balance\", \"payee_id\": \""+lastAccountID+"\", \"amount\": 100, \"description\": \"string\" }";
		ok(testUpdateTransfer(transfers, transferID, sampleTransferUpdate), 'Test Update a specific existing transfer');
		var lastTransferID = getLastTransferId(transfers, accountID, paymentType[0]);
		ok(testDeleteTransfer(transfers, transferID), 'Test Delete a specific existing transfer');

	});
});

function testGetAllTransfers(transfers, accountID, type) {
	var res = transfers.getAll(accountID, type);
	if (res.length > 0) {
		return equals(res[0].payer_id, accountID);
	}
	return false;
}

function testTransferById(transfers, transferID) {
	var res = transfers.getTransferById(transferID);
	return equals(res._id, transferID);
}

function testCreateTransfer(transfers, accountID, sampleTransfer) {
	var respCode = transfers.createTransfer(accountID, sampleTransfer);
	return equals(respCode, 201);
}

function testUpdateTransfer(transfers, transferID, sampleTransferUpdate) {
	var respCode = transfers.updateTransfer(transferID, sampleTransferUpdate);
	return equals(respCode, 202);
}

function testDeleteTransfer(transfers, transferID) {
	var respCode = transfers.deleteTransfer(transferID);
	return equals(respCode, 204); 
}

function getFirstTransferId(transfers, accountID, type) {
	return transfers.getAll(accountID, type)[0]._id;
}

function getLastTransferId(transfers, accountID, type) {
	return transfers.getAll(accountID, type).pop()._id;
}

function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function getLastAccountId(accounts) {
	return accounts.getAllAccounts().pop()._id;
}

function equals(val1, val2) {
	return val1 === val2;
}