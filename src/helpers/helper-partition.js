module.exports.register = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('partition', function (list, size) {
		var o = [],
			l;
		if (size < 1) {
			return o
		}
		while (list.length) {
			l = list.length;
			o.push(list.splice(0, (l < size) ? l : size));
		}
		return o;
	});
};
