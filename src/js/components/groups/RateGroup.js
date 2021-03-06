const Group = require('./abstract/Group');
const InputRange = require('dope-components').InputRange;

class RateGroup extends Group {
	_initInput() {
		const amount = (this.amountInput = new InputRange());
		const frequency = (this.frequencyInput = new InputRange());

		this.inputs = [amount, frequency];
		super._initInput();
	}

	setState() {
		const state = this.options;

		this.amountInput.setState(state.amount);
		this.frequencyInput.setState(state.frequency);
	}

	get fields() {
		return {
			amount: this.amountInput.state.value,
			frequency: this.frequencyInput.state.value
		};
	}

	get state() {
		return {
			amount: this.amountInput.state,
			frequency: this.frequencyInput.state
		};
	}
}

module.exports = RateGroup;
