module.exports.register = function (Handlebars, options) {
	'use strict';

	options = options || {};

	if (!options.hasOwnProperty('gisthub')) {
		options.gisthub = 'https://gist.github.com/';
	}

	Handlebars.registerHelper('a-gist', function (id) {
		var output = '';

		if (id && id.length) {
			output = new Handlebars.SafeString('<a href="'.concat(options.gisthub, id, '"><i class="fa-code"></i> Inspect the code</a>'));
		}

		return output;
	});
};
