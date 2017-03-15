const wtf = require('proxy-polyfill');
const Group = require('./abstract/Group');

/**
 * movieClip command component
 * @class
 * @extends Group
 */
class InputGroup extends Group {

	static events = {
		CHANGE: 'input_group_change',
	};

	constructor(label) {
		super(label);
	}

	set fields(fields) {
		const fieldsProxy = new Proxy(fields, {
			set: (obj, prop, value) => {
				obj[prop] = value;
				this.emit(InputGroup.events.CHANGE, this.value);

				return true;
			},
			get: (obj, prop) => obj[prop],
		});

		this._fields = fieldsProxy;
	}

	get fields() {
		return this._fields;
	}

	_initFields() {
	}

	set panel(panel) {
		this._panel = panel.addGroup({ label: this.label, enable: this.enable });

		// Get last index... a big hacky
		this.group = panel._groups[panel._groups.length - 1];

		this._initFields();
	}

    /**
    * Called when the component html content has been rendered
    */
	rendered() {
		super.rendered();
		// this.wrap.insertBefore(this._grid.container, this.wrap.firstChild);
	}

	get value() {}
}

module.exports = InputGroup;
