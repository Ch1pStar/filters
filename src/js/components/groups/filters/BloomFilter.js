const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class BloomFilter extends Group {
	_initInput() {
		const blur = (this.blurInput = new InputRange());
		const blurX = (this.blurXInput = new InputRange());
		const blurY = (this.blurYInput = new InputRange());
		const state = this.options;

		this.inputs = [blur, blurX, blurY];

		this.blurInput.setState(state.blur);
		this.blurXInput.setState(state.blurX);
		this.blurYInput.setState(state.blurY);
		super._initInput();
	}

	get fields() {
		return {
			blur: this.blurInput.state.value,
			blurX: this.blurXInput.state.value,
			blurY: this.blurYInput.state.value
		};
	}
}

module.exports = BloomFilter;
