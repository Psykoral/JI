module.exports.register = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('link', function (text, url, target, options) {
		text = Handlebars.Utils.escapeExpression(text);
		url = Handlebars.Utils.escapeExpression(url);
		var targetAttr = '',
			hashAttrs = '',
			key,
			result;

		if (target.length) {
			targetAttr = ' target="'.concat(Handlebars.Utils.escapeExpression(target), '"');
		}

		if (options) {

			if (options.hash) {
				options = options.hash;
			}

			for (key in options) {
				if (options.hasOwnProperty(key)) {
					hashAttrs = hashAttrs.concat(' ', key, '="', options[key], '"');
				}
			}

		}

		result = '<a href="'.concat(url, '"', targetAttr, hashAttrs, '>', text, '</a>');

		return new Handlebars.SafeString(result);
	});
};
