module.exports.register = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('ifEqual', function (conditional, options) {
		if (options.hash.value === conditional) {
			return options.fn(this)
		} else {
			return options.inverse(this);
		}
	});
};
