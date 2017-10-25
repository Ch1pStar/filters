const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;
const Checkbox = require('dope-components').Checkbox;

class OutlineFilter extends Group {
	_initInput() {
		const thickness = (this.thicknessInput = new InputRange());
		const color = (this.colorInput = new InputColor());
		const state = this.options;

		this.inputs = [thickness, color];

		this.thicknessInput.setState(state.thickness);
		this.colorInput.setState(state.color);
		super._initInput();
	}

	get fields() {
		return {
			thickness: this.thicknessInput.state.value,
			color: this.colorInput.state.value
		};
	}
}

module.exports = OutlineFilter;
