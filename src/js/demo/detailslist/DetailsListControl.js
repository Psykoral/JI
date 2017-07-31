define(['can', './DetailsPolyfill'], function (can, polyfill) {
	'use strict';

	return can.Control.extend({
		init: function () {
			var root = this.element;

			if (this.element.length) {
				root = this.element[0];

				if (root) {
					polyfill(root.ownerDocument);
				}
			}
		}
	});
});
