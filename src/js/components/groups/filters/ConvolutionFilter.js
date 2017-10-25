const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class ConvolutionFilter extends Group {
	_initInput() {
		const width = (this.widthInput = new InputRange());
		const height = (this.heightInput = new InputRange());
		const state = this.options;

		this.inputs = [width, height];

		this.widthInput.setState(state.width);
		this.heightInput.setState(state.height);
		super._initInput();
	}

	get fields() {
		return {
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
