const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class ConvolutionFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const width = (this.widthInput = new InputRange());
		const height = (this.heightInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, width, height];

		this.enabledInput.setState(state.enabled);
		this.widthInput.setState(state.width);
		this.heightInput.setState(state.height);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			width: this.widthInput.state.value,
			height: this.heightInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		width: this.widthInput.state,
	// 		height: this.heightInput.state
	// 	};
	// }
}

module.exports = ConvolutionFilter;
