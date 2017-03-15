const InputGroup = require('./InputGroup');

class RandomDriftGroup extends InputGroup {

	constructor(parent) {
		super('RandomDrift');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			delay: 2,
			delayRange: [0, 100],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });

		this._panel.addSlider(this.fields, 'delay', 'delayRange', { step: 1 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.RandomDrift(${this.fields.x}, ${this.fields.y}, ${this.fields.delay}));`;
	}
}

module.exports = RandomDriftGroup;
