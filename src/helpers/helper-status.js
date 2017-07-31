module.exports.register = function (Handlebars) {
	'use strict';

	var statusModel = {
		'experiment': {'name': 'Experimental', 'style': 'demo-status-experiment'},
		'development': {'name': 'Development', 'style': 'demo-status-development'},
		'deprecated': {'name': 'Deprecated', 'style': 'demo-status-deprecated'},
		'stable': {'name': 'Stable', 'style': 'demo-status-stable'},
		'released': {'name': 'Released', 'style': 'demo-status-released'}
	};

	Handlebars.registerHelper('status', function (status) {
		if (statusModel.hasOwnProperty(status)) {
			var s = statusModel[status];
			return new Handlebars.SafeString(''.concat('<i title="', s.name, '" class="demo-status ', s.style, '"><\/i>'));
		} else {
			return '';
		}
	});
};
