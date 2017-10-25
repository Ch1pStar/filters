const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;
const InputColor = require('dope-components').InputColor;

class SimpleLightmapFilter extends Group {
	_initInput() {
		const color = (this.colorInput = new InputColor());
		const alpha = (this.alphaInput = new InputRange());
		const state = this.options;

		this.inputs = [color, alpha];

		this.colorInput.setState(state.color);
		this.alphaInput.setState(state.alpha);
		super._initInput();
	}

	get fields() {
		return {
			color: this.colorInput.state.value,
			alpha: this.alphaInput.state.value,
		};
	}
}

module.exports = SimpleLightmapFilter;
