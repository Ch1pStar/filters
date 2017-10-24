const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;
const Checkbox = require('dope-components').Checkbox;

class GlowFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const innerStrength = (this.innerStrengthInput = new InputRange());
		const outerStrength = (this.outerStrengthInput = new InputRange());
		const distance = (this.distanceInput = new InputRange());
		const color = (this.colorInput = new InputColor());
		const quality = (this.qualityInput = new InputRange());
		// const isCollapsed = (this.isCollapsed = new Boolean());
		const state = this.options;

		this.inputs = [enabled, innerStrength, outerStrength, distance, color, quality /*, isCollapsed*/];

		this.enabledInput.setState(state.enabled);
		this.innerStrengthInput.setState(state.innerStrength);
		this.outerStrengthInput.setState(state.outerStrength);
		this.distanceInput.setState(state.distance);
		this.colorInput.setState(state.colorInput);
		this.qualityInput.setState(state.quality);
		// this.isCollapsed.setState(state.isCollapsed);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			innerStrength: this.innerStrengthInput.state.value,
			outerStrength: this.outerStrengthInput.state.value,
			distance: this.distanceInput.state.value,
			color: this.colorInput.state.value,
			quality: this.qualityInput.state.value
			// isCollapsed: this.isCollapsed.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		innerStrength: this.innerStrengthInput.state,
	// 		outerStrength: this.outerStrengthInput.state,
	// 		distance: this.distanceInput.state,
	// 		color: this.colorInput.state,
	// 		quality: this.qualityInput.state
	// 		// isCollapsed: this.isCollapsed.state
	// 	};
	// }
}

module.exports = GlowFilter;
