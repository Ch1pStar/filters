const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class BloomFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const blur = (this.blurInput = new InputRange());
		const blurX = (this.blurXInput = new InputRange());
		const blurY = (this.blurYInput = new InputRange());
		this.inputs = [enabled, blur, blurX, blurY];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.blurInput.setState(state.blur);
		this.blurXInput.setState(state.blurX);
		this.blurYInput.setState(state.blurY);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			blur: this.blurInput.state.value,
			blurX: this.blurXInput.state.value,
			blurY: this.blurYInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state.value,
			blur: this.blurInput.state,
			blurX: this.blurXInput.state,
			blurY: this.blurYInput.state
		};
	}
}

module.exports = BloomFilter;
