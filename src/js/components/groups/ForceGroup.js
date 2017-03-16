const InputGroup = require('./InputGroup');

class ForceGroup extends InputGroup {

	constructor(parent) {
		super('Force');
		this.parentComponent = parent;

		this.fields = {
			x: 0,
			y: 0,
			_rangeX: [-100, 100],
			_rangeY: [-100, 100],
		};
	}

	_initFields() {
		this._panel.addSlider(this._fields, 'x', '_rangeX', { step: 1 });
		this._panel.addSlider(this._fields, 'y', '_rangeY', { step: 1 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.Force(${this.fields.x}, ${this.fields.y}));`;
	}
}

module.exports = ForceGroup;
