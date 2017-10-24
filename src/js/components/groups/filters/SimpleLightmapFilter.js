const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;
const InputColor = require('dope-components').InputColor;

class SimpleLightmapFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const color = (this.colorInput = new InputColor());
		const alpha = (this.alphaInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, color, alpha];

		this.enabledInput.setState(state.enabled);
		this.colorInput.setState(state.color);
		this.alphaInput.setState(state.alpha);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			color: this.colorInput.state.value,
			alpha: this.alphaInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		color: this.colorInput.state,
	// 		alpha: this.alphaInput.state
	// 	};
	// }
}

module.exports = SimpleLightmapFilter;
