const DopeGroup = require('../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;

class AlphaGroup extends DopeGroup {

	constructor(state) {
		super('Alpha', state);
	}

	_initInput() {
		const min = this.minInput = new InputRange();
		const max = this.maxInput = new InputRange();

		this.inputs = [min, max];
		super._initInput();
	}

	setState() {
		const state = this.options;

		this.minInput.setState(state.min);
		this.maxInput.setState(state.max);
	}

	get fields() {
		return {
			min: this.minInput.state.value,
			max: this.maxInput.state.value,
			life: 0,
		};
	}

	get state() {
		return {
			min: this.minInput.state,
			max: this.maxInput.state,
		}
	}
}

module.exports = AlphaGroup;