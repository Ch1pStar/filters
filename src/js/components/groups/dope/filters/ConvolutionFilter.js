const DopeGroup = require('../../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class ConvolutionFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const width = (this.widthInput = new InputRange());
		const height = (this.heightInput = new InputRange());
		this.inputs = [enabled, width, height];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.widthInput.setState(state.width);
		this.heightInput.setState(state.height);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			width: this.widthInput.state.value,
			height: this.heightInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			width: this.widthInput.state,
			height: this.heightInput.state
		};
	}
}

module.exports = ConvolutionFilter;
