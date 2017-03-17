const InputGroup = require('./InputGroup');

class RandomDriftGroup extends InputGroup {

	constructor(parent) {
		super('RandomDrift');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			_yRange: [0, 1080],
			_xRange: [0, 1920],
			delay: 2,
			_delayRange: [0, 100],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x', '_xRange', { step: 1 });
		this._panel.addSlider(fields, 'y', '_yRange', { step: 1 });
		this._panel.addSlider(fields, 'delay', '_delayRange', { step: 1 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.RandomDrift(${this.fields.x}, ${this.fields.y}, ${this.fields.delay}));`;
	}
}

module.exports = RandomDriftGroup;
