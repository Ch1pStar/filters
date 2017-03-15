const InputGroup = require('./InputGroup');

class RateGroup extends InputGroup {

	constructor(parent) {
		super('Rate');
		this.parentComponent = parent;

		this.fields = {
			amount: 100,
			amountRange: [1, 300],
			frequency: 0.1,
			frequencyRange: [0.001, 2],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addSlider(this.fields, 'amount', 'amountRange', { step: 10 });
		this._panel.addSlider(this.fields, 'frequency', 'frequencyRange', { step: 0.01 });
	}

	get value() {
		return `emitter.rate = new Proton.Rate(${this.fields.amount}, ${this.fields.frequency});`;
	}
}

module.exports = RateGroup;
