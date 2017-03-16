const InputGroup = require('./InputGroup');

class GravityWellGroup extends InputGroup {

	constructor(parent) {
		super('GravityWell');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			force: 15,
			_forceRange: [1, 100],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });

		this._panel.addSlider(fields, 'force', '_forceRange', { step: 5 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.GravityWell({x:${this.fields.x}, y:${this.fields.y}}, ${this.fields.force}));`;
	}
}

module.exports = GravityWellGroup;
