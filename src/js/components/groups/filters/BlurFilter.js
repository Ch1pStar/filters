const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class BlurFilter extends Group {
	_initInput() {
		const blur = (this.blurInput = new InputRange());
		const quality = (this.qualityInput = new InputRange());
		const state = this.options;

		this.inputs = [blur, quality];

		this.blurInput.setState(state.blur);
		this.qualityInput.setState(state.quality);
		super._initInput();
	}

	get fields() {
		return {
			blur: this.blurInput.state.value,
			quality: this.qualityInput.state.value,
		};
	}
}

module.exports = BlurFilter;
