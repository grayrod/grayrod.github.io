/*!
 * jQuery Wiggle
 *
 * Written by sizeof(cat) <sizeofcat AT riseup DOT net>
 * Licensed under the MIT license
 * Version 2.0.0
 */

(function($) {
	$.fn.catWiggle = function(method, options) {
		options = $.extend({
			degrees: ['2', '4', '2', '0', '-2', '-4', '-2', '0'],
			delay: 35,
			limit: null,
			random_start: true,
			on_wiggle: function(target_element) {},
			on_wiggle_start: function(target_element) {},
			on_wiggle_stop: function(target_element) {}
		}, options);
		var methods = {
			wiggle: function(target_element, step) {
				if (step === undefined) {
					step = options.random_start ? Math.floor(Math.random() * options.degrees.length) : 0;
				}
				if (!$(target_element).hasClass('wiggling')) {
					$(target_element).addClass('wiggling');
				}
				var degree = options.degrees[step];
				$(target_element).css({
					'-webkit-transform': 'rotate(' + degree + 'deg)',
					'-moz-transform': 'rotate(' + degree + 'deg)',
					'-ms-transform': 'rotate(' + degree + 'deg)',
					'-o-transform': 'rotate(' + degree + 'deg)',
					'-sand-transform': 'rotate(' + degree + 'deg)',
					'transform': 'rotate(' + degree + 'deg)'
				});
				if (step === (options.degrees.length - 1)) {
					step = 0;
					if ($(target_element).data('wiggles') === undefined) {
						$(target_element).data('wiggles', 1);
					}
					else {
						$(target_element).data('wiggles', $(target_element).data('wiggles') + 1);
					}
					options.on_wiggle(target_element);
				}
				if (options.limit && $(target_element).data('wiggles') == options.limit) {
					return methods.stop(target_element);
				}
				target_element.timeout = setTimeout(function() {
					methods.wiggle(target_element, step + 1);
				}, options.delay);
			},
			stop: function(target_element) {
				$(target_element).data('wiggles', 0);
				$(target_element).css({
					'-webkit-transform': 'rotate(0deg)',
					'-moz-transform': 'rotate(0deg)',
					'-ms-transform': 'rotate(0deg)',
					'-o-transform': 'rotate(0deg)',
					'-sand-transform': 'rotate(0deg)',
					'transform': 'rotate(0deg)'
				});
				if ($(target_element).hasClass('wiggling')) {
					$(target_element).removeClass('wiggling');
				}
				clearTimeout(target_element.timeout);
				target_element.timeout = null;
				options.on_wiggle_stop(target_element);
			},
			is_wiggling: function(target_element) {
				return !target_element.timeout ? false : true;
			}
		};
		if (method === 'is_wiggling' && this.length === 1) {
			return methods.is_wiggling(this[0]);
		}
		this.each(function() {
			if ((method === 'start' || method === undefined) && !this.timeout) {
				methods.wiggle(this);
				options.on_wiggle_start(this);
			}
			else if (method === 'stop') {
				methods.stop(this);
			}
		});
		return this;
	};
})(jQuery);
