define(['demo/debug/Debug'], function (Debug) {
	'use strict';

	var debug = new Debug();

	describe('Debug script should ', function () {
		it('be defined', function () {
			expect(debug).toBeDefined();
		});
	});
});
