/*
 * Name: helper-replace.js
 * $Author: jisutton
 * $Created: 8/19/15 3:29 PM
 */

module.exports.register = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('replace', function (needle, haystack, instead) {
		return haystack.replace(new RegExp(needle), instead);
	});
};
