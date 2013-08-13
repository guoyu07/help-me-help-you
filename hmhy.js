(function (window, hmhy, undefined) {
	"use strict";
	var document = window.document,
			helpTab = document.getElementById('contextual-help-link'),
			helpLinks = {},
			helpLink,
			x;

	function scopedEvent(func, scope) {
		return function (event) {
			func.call(scope, event);
		}
	}

	function click(element) {
		var event = document.createEvent('MouseEvents')
		event.initEvent('click', true, true);
		element.dispatchEvent(event);
	}

	function HelpLink(elementOrID) {
		var t = this;
		if ('string' === typeof elementOrID) {
			elementOrID = document.getElementById(elementOrID);
		}
		this.el = elementOrID;
		if (this.el) {
			this.id = this.el.getAttribute('data-hmhy-id');
			this.helpTabLink = document.getElementById('tab-link-' + this.id).querySelector('a');
			this.el.addEventListener('click', scopedEvent(t.click, t));
		} else {
			this.id = x;
		}
	}

	HelpLink.prototype.helpTabLink = null;
	HelpLink.prototype.id = '';

	HelpLink.prototype.click = function (event) {
		event.preventDefault();
		if (this.helpTabLink) {
			click(helpTab);
			click(this.helpTabLink);
		}
	};

	for (x = 0; x < hmhy.ids.length; x += 1) {
		helpLink = new HelpLink('hmhy_' + hmhy.ids[x]);
		helpLinks[helpLink.id] = helpLink;
	}

}(this, this.HMHY || {ids: []}));
