/**
 * @file Debug.js
 * @desc CLDD - the only really useful development life cycle
 *
 * @author psykoral
 * @since 9/25/15 4:58 PM
 *
 * @requires can
 */

define(['can'], function (can) {
	'use strict';

	/**
	 * @func Debug
	 * @desc can Control for Debug messages
	 *
	 * @constructs can.Control.extend.Debug
	 * @returns {can.Control.extend.Debug}
	 */
	return can.Control.extend({
		defaults: {
			debug: false,
			control: null
		}
	}, {
		/**
		 * @func init
		 * @desc initializing Debug constructor
		 * @param el {String} Never used, only necessary by way of can.init's specific params
		 * @param options {Object} Used in constructors to change the value of this.options items.
		 * @memberof Debug
		 */
		init: function (el, options) {
			if (!options.debug && typeof options.control !== null && window.location.search.indexOf('flippy:debug=' + options.control) > -1) {
				this.options.debug = true;
				this.log('Enabling URL Debug mode for ' + this.options.control);
			}
		},
		/**
		 * @func log
		 * @desc console logs output
		 * @param log {String | Array} Accepts a single string to log, or an array of items to be logged as space separated items.
		 * @memberof Debug
		 */
		log: function (log) {
			if (!!this.options.debug) {
				console.log(log);
			}
		}
	});
});
