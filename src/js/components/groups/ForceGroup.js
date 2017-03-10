const InputGroup = require('./InputGroup');

class ForceGroup extends InputGroup {

	constructor(parent) {
		super('Force');
		this.parentComponent = parent;

		this.fields = {
			x: 0,
			y: 0,
			rangeX: [-100, 100],
			rangeY: [-100, 100],
		};
	}

	_initFields() {
		this._panel.addSlider(this.fields, 'x', 'rangeX', { step: 1 });
		this._panel.addSlider(this.fields, 'y', 'rangeY', { step: 1 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.Force(${this.fields.x}, ${this.fields.y}));`;
	}
}

module.exports = ForceGroup;
