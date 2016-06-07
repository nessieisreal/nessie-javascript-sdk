<!-- //
/*
 * Author: Vincent K. Sam
 * Created on: January 16, 2016
 */
// -->

require(['branch'], function (branch) {

	module('Branch API - Module');
	test('tests', function() {
		var branches = branch.initWithKey(apikey);
		var branchId = getFirstBranchId(branches);

		ok(testGetAllBranches(branches), 'Test Get all branches');
		ok(testGetBranchById(branches, branchId), 'Test Get branch by id');
	});
});


function testGetAllBranches(branches) {
	var res = branches.getAll();
	if (res.length > 0) {
		return !equals(res[0].name, "");
	}
	return false;
}

function testGetBranchById(branches, branchId) {
	var res = branches.getBranch(branchId)._id;
	return equals(res, branchId);
}

function getFirstBranchId(branches) {
	return branches.getAll()[0]._id;
}

function equals(val1, val2) {
	return val1 === val2;
}