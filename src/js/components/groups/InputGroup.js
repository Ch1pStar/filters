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
		const fieldsProxy = new global.Proxy(fields, {
			set: (obj, prop, value) => {
				obj[prop] = value;
				this.emit(InputGroup.events.CHANGE, this.value);

				return true;
			},
			get: (obj, prop) => obj[prop],
		});

		this._fields = fieldsProxy;
		// this._fields = fields;
	}

	get fields() {
		const fields = {};
		for(let field in this._fields){
			if(field.charAt(0) !== '_'){
				fields[field] = this._fields[field];
			}
		}
		return fields
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
