const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class TiltShiftFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const blur = (this.blurInput = new InputRange());
		const gradientBlur = (this.gradientBlurInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, blur, gradientBlur];

		this.enabledInput.setState(state.enabled);
		this.blurInput.setState(state.blur);
		this.gradientBlurInput.setState(state.gradientBlur);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			blur: this.blurInput.state.value,
			gradientBlur: this.gradientBlurInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			blur: this.blurInput.state,
			gradientBlur: this.gradientBlurInput.state
		};
	}
}

module.exports = TiltShiftFilter;
