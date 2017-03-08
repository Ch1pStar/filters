const Group = require('./abstract/Group');

/**
 * movieClip command component
 * @class
 * @extends Group
 */
class InputGroup extends Group {

	/**
	 * @type {string}
	 * @private
	 */
	_value = '';

	set panel(panel) {
		this._panel = panel.addGroup({ label: this.label.charAt(0).toUpperCase() + this.label.slice(1), enable: this.enable });

		// Get last index... a big hacky
		this.group = panel._groups[panel._groups.length - 1];

		panel.addStringInput(this, '_value', { label:  this.label.charAt(0).toUpperCase() + this.label.slice(1)+':' });

		// this.addAddButton();
	}

    /**
    * Called when the component html content has been rendered
    */
	rendered() {
		super.rendered();
		// this.wrap.insertBefore(this._grid.container, this.wrap.firstChild);
	}

	get value() {
		return { [this.label]: this._value }
	}
}

module.exports = InputGroup;
