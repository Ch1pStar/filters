const InputGroup = require('./InputGroup');

class RateGroup extends InputGroup {

	constructor(parent) {
		super('Rate');
		this.parentComponent = parent;

		this.fields = {
			amount: 8,
			_amountRange: [1, 300],
			frequency: 0.01,
			_frequencyRange: [0.001, 2],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'amount', '_amountRange', { step: 10 });
		this._panel.addSlider(fields, 'frequency', '_frequencyRange', { step: 0.01 });
	}

	get value() {
		return `emitter.rate = new Proton.Rate(${this.fields.amount}, ${this.fields.frequency});`;
	}
}

module.exports = RateGroup;
