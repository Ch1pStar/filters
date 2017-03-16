const InputGroup = require('./InputGroup');

class RandomDriftGroup extends InputGroup {

	constructor(parent) {
		super('RandomDrift');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			delay: 2,
			_delayRange: [0, 100],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });

		this._panel.addSlider(fields, 'delay', '_delayRange', { step: 1 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.RandomDrift(${this.fields.x}, ${this.fields.y}, ${this.fields.delay}));`;
	}
}

module.exports = RandomDriftGroup;
