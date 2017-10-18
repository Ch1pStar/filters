const DopeGroup = require('../../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class TiltShiftFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const blur = (this.blurInput = new InputRange());
		const gradientBlur = (this.gradientBlurInput = new InputRange());
		this.inputs = [enabled, blur, gradientBlur];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.blurInput.setState(state.blur);
		this.gradientBlurInput.setState(state.gradientBlur);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			blur: this.blurInput.state.value,
			gradientBlur: this.qualityInput.state.value
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
