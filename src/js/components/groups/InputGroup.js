const Group = require('./abstract/Group');

/**
 * movieClip command component
 * @class
 * @extends Group
 */
class InputGroup extends Group {

	constructor(label, fields) {
		super(label);

		this.fields = fields;
	}

	/**
	 * @type {string}
	 * @private
	 */
	_value = 0;

	set panel(panel) {
		this._panel = panel.addGroup({ label: this.label, enable: this.enable });

		// Get last index... a big hacky
		this.group = panel._groups[panel._groups.length - 1];

		if (this.fields) {
			for (const field in this.fields) {
				panel.addStringInput(this.fields, field, { label:  `${field}:` });
			}
		} else {
			panel.addStringInput(this, '_value', { label:  `${this.label}:` });
		}
	}

    /**
    * Called when the component html content has been rendered
    */
	rendered() {
		super.rendered();
		// this.wrap.insertBefore(this._grid.container, this.wrap.firstChild);
	}

	get value() {
		return { [this.label]: parseInt(this._value, 10) };
	}
}

module.exports = InputGroup;
