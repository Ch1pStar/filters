const DopeGroup = require('../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;

class GlowFilter extends DopeGroup {
	_initInput() {
		const innerStrength = (this.innerStrengthInput = new InputRange());
		const outerStrength = (this.outerStrengthInput = new InputRange());
		const distance = (this.distanceInput = new InputRange());
		const color = (this.colorInput = new InputColor());
		this.inputs = [innerStrength, outerStrength, distance, color];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.innerStrengthInput.setState(state.innerStrength);
		this.outerStrengthInput.setState(state.outerStrength);
		this.distanceInput.setState(state.distance);
		this.colorInput.setState(state.colorInput);
	}

	get fields() {
		return {
			innerStrength: this.innerStrengthInput.state.value,
			outerStrength: this.outerStrengthInput.state.value,
			distance: this.distanceInput.state.value,
			color: this.colorInput.state.value
		};
	}

	get state() {
		return {
			innerStrength: this.innerStrengthInput.state,
			outerStrength: this.outerStrengthInput.state,
			distance: this.distanceInput.state,
			color: this.colorInput.state
		};
	}
}

module.exports = GlowFilter;
