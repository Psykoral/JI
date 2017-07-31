/**
 * @file DirControl.js
 * @method DirControl
 * @desc Page direction control
 * @author psykoral
 * @since 7/6/16 11:03 AM
 *
 * @requires can
 * @requires debug
 * @constructs can.Control.extend.DirControl
 * @returns {can.Control.extend.DirControl}
 */

define(['can', 'debug'], function (can, Debug) {
	'use strict';
	return can.Control.extend({
		defaults: {
			debug: false
		}
	}, {
		/**
		 * @method init
		 * @desc Initializes a mobile direction component
		 *
		 * @memberof DirControl
		 *
		 * @borrows Debug()
		 * @borrows this.loadDir()
		 *
		 */
		init: function () {
			this.debug = new Debug('', {debug: this.options.debug, control: 'Direction'});
			this.debug.log('----------------------------------------Direction--------------------------------------------------');
			this.swap = can.$('html');
			this.rtlItem = this.swap.find('[data-seed-dir="rtl"]');
			this.ltrItem = this.swap.find('[data-seed-dir="ltr"]');

			this.debug.log(['this.rtlItem: ', this.rtlItem]);
			this.debug.log(['this.ltrItem: ', this.ltrItem]);

			this.loadDir(null);
		},
		/**
		 * @method loadDir
		 * @desc Loads the desired page direction
		 *
		 * @memberof DirControl
		 *
		 * @param dir {String} 'rtl' or defaults to 'ltr'
		 * @borrows this.attach()
		 *
		 */
		loadDir: function (dir) {
			if (dir === null) {
				this.currentDir = window.localStorage.getItem('flippy_demo_dir');
			} else {
				this.currentDir = dir;
			}

			if (this.currentDir === 'rtl') {
				this.ltrItem.css('display', 'inline-block');
				this.rtlItem.hide();
			} else {
				this.rtlItem.css('display', 'inline-block');
				this.ltrItem.hide();
			}

			this.attach(this.currentDir);
		},
		/**
		 * @method setDir
		 * @desc Saves page direction
		 *
		 * @memberof DirControl
		 *
		 * @param val {String} 'rtl' or 'ltr'
		 *
		 * @borrows window.localStorage.setItem
		 *
		 */
		setDir: function (val) {
			window.localStorage.setItem('flippy_demo_dir', val);
		},
		/**
		 * @method attach
		 * @desc Sets the dir attribute on <html> and saves it in localStorage
		 *
		 * @memberof DirControl
		 *
		 * @param dir {String} 'rtl' or 'ltr'
		 *
		 * @borrows this.setDir()
		 *
		 */
		attach: function (dir) {
			this.swap.attr('dir', dir);
			this.setDir(dir);
		},
		/**
		 * @method attach
		 * @desc Sets the dir attribute on <html> and saves it in localStorage
		 *
		 * @memberof DirControl
		 *
		 * @param el {Object} Clicked element
		 * @param ev {Object} Click event
		 *
		 * @borrows this.loadDir()
		 *
		 */
		'click': function (el, ev) {
			ev.preventDefault();
			this.direction = this.element.data('seed-dir');
			this.loadDir(this.direction);
		}
	});
});
