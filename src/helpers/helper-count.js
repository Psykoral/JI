module.exports.register = function (Handlebars) {
	'use strict';

	var current = 0;

	Handlebars.registerHelper('count', function (options) {
		return (arguments.length > 1) ? (current = current + 1) : current;
	});
};
