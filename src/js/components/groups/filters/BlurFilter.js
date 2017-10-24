const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class BlurFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const blur = (this.blurInput = new InputRange());
		const quality = (this.qualityInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, blur, quality];

		this.enabledInput.setState(state.enabled);
		this.blurInput.setState(state.blur);
		this.qualityInput.setState(state.quality);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			blur: this.blurInput.state.value,
			quality: this.qualityInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		blur: this.blurInput.state,
	// 		quality: this.qualityInput.state
	// 	};
	// }
}

module.exports = BlurFilter;
