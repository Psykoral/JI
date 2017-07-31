module.exports.register = function (Handlebars) {
	'use strict';
	Handlebars.registerHelper('lorem', function (lines) {
		var lineModel = ['Nulla facilisi. Sed et turpis dictum, tempor purus quis, placerat purus.', 'Duis sodales elit lectus, ut elementum velit laoreet fringilla.', 'The quick brown fox jumps over the lazy dog.'],
			out,
			i;

		out = lineModel[lineModel.length - 1];

		for (i = 1; i < lines; i++) {
			out = out.concat(' ', lineModel[i % lineModel.length]);
		}

		return out;
	});
};
