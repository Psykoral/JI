module.exports.register = function (Handlebars, hbOptions) {
	'use strict';

	hbOptions = hbOptions || {};

	Handlebars.registerHelper('image', function (context, options) {

		var attrs = '', hash = options.hash,
			prop;

		for (prop in hash) {
			if (hash.hasOwnProperty(prop)) {
				attrs = attrs.concat(' ', prop, '="', hash[prop], '"');
			}
		}

		return (new Handlebars.SafeString('<img src="'.concat(hbOptions.assets, '/', hbOptions.images, '/', Handlebars.Utils.escapeExpression(context), '"', attrs, '>')));
	});
};
