const InputGroup = require('./InputGroup');

class BlendModeGroup extends InputGroup {

	constructor(parent) {
		super('BlendMode');
		this.parentComponent = parent;

		this.fields = {
			_modeRange: ['NORMAL', 'ADD', 'MULTIPLY', 'SCREEN'],
			blendMode: 'NORMAL',
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSelect(fields, '_modeRange', { label: 'BlendMode', target: 'blendMode' });
	}

	get value() {
		const fields = this.fields;

		return `this.cnt.blendMode = PIXI.BLEND_MODES.${fields.blendMode};`;
	}
}

module.exports = BlendModeGroup;
