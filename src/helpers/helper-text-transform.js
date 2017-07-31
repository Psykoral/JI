module.exports.register = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('tolower', function (options) {
		return options.fn(this).toLowerCase();
	});

	Handlebars.registerHelper('toupper', function (options) {
		return options.fn(this).toUpperCase();
	});

	Handlebars.registerHelper('firstupper', function (options) {
		return options.fn(this).charAt(0).toUpperCase() + this.slice(1);
	});
};
