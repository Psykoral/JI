module.exports.register = function (Handlebars) {
	'use strict';

	Handlebars.registerHelper('link-list', function (text, count) {
		text = Handlebars.Utils.escapeExpression(text);
		count = count || 5;

		var links = '<li><a href="#">' + text + '</a></li>',
			out = links,
			i;

		for (i = 1; i < count; i++) {
			out += links;
		}

		out = '<ul>' + out + '</ul>';

		return new Handlebars.SafeString(out);
	});
};
