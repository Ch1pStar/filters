const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class TiltShiftFilter extends Group {
	_initInput() {
		const blur = (this.blurInput = new InputRange());
		const gradientBlur = (this.gradientBlurInput = new InputRange());
		const state = this.options;

		this.inputs = [blur, gradientBlur];

		this.blurInput.setState(state.blur);
		this.gradientBlurInput.setState(state.gradientBlur);
		super._initInput();
	}

	get fields() {
		return {
			blur: this.blurInput.state.value,
			gradientBlur: this.gradientBlurInput.state.value
		};
	}
}

module.exports = TiltShiftFilter;
