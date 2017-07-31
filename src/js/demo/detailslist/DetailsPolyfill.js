define([], function () {
	'use strict';

	function handleSummaryOpen(e) {
		var target = e.target,
			details;

		if (target.nodeName !== 'SUMMARY') {
			return;
		} else {
			if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) {
				return;
			}
			details = target.parentNode;
			if (details.getAttribute('closed')) {
				details.removeAttribute('closed');
			} else {
				details.setAttribute('closed', 'closed');
			}
		}
	}

	return function (doc) {
		var summaries,
			len,
			i;

		summaries = doc.querySelectorAll('summary');
		len = summaries.length;

		for (i = 0; i < len; i++) {
			summaries[i].setAttribute('tabindex', '0');
			summaries[i].addEventListener('click', handleSummaryOpen);
			summaries[i].addEventListener('keypress', handleSummaryOpen);
		}
	};
});
