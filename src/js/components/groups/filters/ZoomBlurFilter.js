const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class ZoomBlurFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const strength = (this.strengthInput = new InputRange());
		const centerX = (this.centerXInput = new InputRange());
		const centerY = (this.centerYInput = new InputRange());
		const innerRadius = (this.innerRadiusInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, strength, centerX, centerY, innerRadius];

		this.enabledInput.setState(state.enabled);
		this.strengthInput.setState(state.strength);
		this.centerXInput.setState(state.centerX);
		this.centerYInput.setState(state.centerY);
		this.innerRadiusInput.setState(state.innerRadius);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			strength: this.strengthInput.state.value,
			centerX: this.centerXInput.state.value,
			centerY: this.centerYInput.state.value,
			innerRadius: this.innerRadiusInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		strength: this.strengthInput.state,
	// 		centerX: this.centerXInput.state,
	// 		centerY: this.centerYInput.state,
	// 		innerRadius: this.innerRadiusInput.state
	// 	};
	// }
}

module.exports = ZoomBlurFilter;
