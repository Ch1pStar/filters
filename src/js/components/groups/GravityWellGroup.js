const InputGroup = require('./InputGroup');

class GravityWellGroup extends InputGroup {

	constructor(parent) {
		super('GravityWell');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			_yRange: [0, 1080],
			_xRange: [0, 1920],
			force: 15,
			_forceRange: [1, 100],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x', '_xRange', { step: 1 });
		this._panel.addSlider(fields, 'y', '_yRange', { step: 1 });
		this._panel.addSlider(fields, 'force', '_forceRange', { step: 5 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.GravityWell({x:${this.fields.x}, y:${this.fields.y}}, ${this.fields.force}));`;
	}
}

module.exports = GravityWellGroup;
