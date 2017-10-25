const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;
const Checkbox = require('dope-components').Checkbox;

class GlowFilter extends Group {
	_initInput() {
		const innerStrength = (this.innerStrengthInput = new InputRange());
		const outerStrength = (this.outerStrengthInput = new InputRange());
		const distance = (this.distanceInput = new InputRange());
		const color = (this.colorInput = new InputColor());
		const quality = (this.qualityInput = new InputRange());
		// const isCollapsed = (this.isCollapsed = new Boolean());
		const state = this.options;

		this.inputs = [innerStrength, outerStrength, distance, color, quality /*, isCollapsed*/];

		this.innerStrengthInput.setState(state.innerStrength);
		this.outerStrengthInput.setState(state.outerStrength);
		this.distanceInput.setState(state.distance);
		this.colorInput.setState(state.colorInput);
		this.qualityInput.setState(state.quality);
		super._initInput();
	}

	get fields() {
		return {
			innerStrength: this.innerStrengthInput.state.value,
			outerStrength: this.outerStrengthInput.state.value,
			distance: this.distanceInput.state.value,
			color: this.colorInput.state.value,
			quality: this.qualityInput.state.value
		};
	}
}

module.exports = GlowFilter;
