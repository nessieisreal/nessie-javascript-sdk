<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['purchase', 'account', 'merchant'], function (purchase, account, merchant) {

	module('Purchase API - Module');
	test('tests', function() {
		var purchases = purchase.initWithKey(apikey);
		var accounts = account.initWithKey(apikey);
		var merchants = merchant.initWithKey(apikey);

		var accountID = getFirstAccountId(accounts);
		var purchaseID = getFirstPurchaseId(purchases, accountID);
		var lastPurchaseId = getLastPurchaseId(purchases, accountID);
		var merchantID = getFirstMerchantId(purchases, accountID);

		var samplePurchase = '{ "merchant_id": "55e94a6cf8d8770528e6196d", "medium": "balance", "purchase_date": "2015-12-02", "amount": 0, "status": "pending", "description": "string" }';
		var samplePurchaseUpdate = '{ "payer_id": "string", "medium": "balance", "amount": 0, "description": "string" }';

		if (merchantID != null) {
			ok(testGetPurchasesForParams(purchases, accountID, merchantID), 'Test Get all purchases by account and merchant');
			ok(testGetPurchasesByMerchant(purchases, merchantID), 'Test Get all purchases by merchant');
		}
		
		ok(testGetAllPurchases(purchases, accountID), 'Test Get all purchases');
		
		if (purchaseID != null) {
			ok(testGetPurchaseById(purchases, purchaseID), 'Test Get purchase by id');
			ok(testUpdatePurchase(purchases, purchaseID, samplePurchaseUpdate), 'Test Update a specific existing purchase');
			ok(testDeletePurchase(purchases, purchaseID), 'Test Delete a specific existing purchase');
		}
		
		ok(testCreatePurchase(purchases, accountID, samplePurchase), 'Test Create a purchase');
		
	});
});


function testGetAllPurchases(purchases, accountID) {
	var res = purchases.getAll(accountID);
	return evaluatePurchases(res);
}

function testGetPurchasesForParams(purchases, accountID, merchantID) {
	var res = purchases.getAllByAcctAndMerchant(accountID, merchantID);
	return evaluatePurchases(res);
}

function testGetPurchasesByMerchant(purchases, merchantID) {
	var res = purchases.getAllByMerchant(merchantID);
	return evaluatePurchases(res);
}

function testGetPurchaseById(purchases, purchaseID) {
	var res = purchases.getPurchase(purchaseID);
	return evaluatePurchases(res);
}

function testCreatePurchase(purchases, accountID, samplePurchase) {
	var respCode = purchases.createPurchase(accountID, samplePurchase);
	return equals(respCode, 201);
}

function testUpdatePurchase(purchases, purchaseID, samplePurchaseUpdate) {
	var respCode = purchases.updatePurchase(purchaseID, samplePurchaseUpdate);
	return equals(respCode, 202);
}

function testDeletePurchase(purchases, purchaseID) {
	var respCode = purchases.deletePurchase(purchaseID);
	return equals(respCode, 200);
}

function evaluatePurchases(res) {
	if (res.length > 0) {
		return !equals(res[0]._id, "");
	} else {
		return res.length == 0;
	}
}

function getFirstAccountId(accounts) {
	return accounts.getAllAccounts()[0]._id;
}

function getFirstPurchaseId(purchases, accountID) {
	var res = purchases.getAll(accountID);
	if (res.length > 0) { 
		return res._id;
	}
	return null;
}

function getLastPurchaseId(purchases, accountID){
	var res = purchases.getAll(accountID);
	if (res.length > 0) {
		return res.pop()._id;
	}
	return null;
}

function getFirstMerchantId(purchases, accountID) {
	var res = purchases.getAll(accountID);
	if (res.length > 0) { 
		return res.merchant_id;
	}
	return null;
}

function equals(val1, val2) {
	return val1 === val2;
}