const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;
const Checkbox = require('dope-components').Checkbox;

class OutlineFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const thickness = (this.thicknessInput = new InputRange());
		const color = (this.colorInput = new InputColor());
		const state = this.options;

		this.inputs = [enabled, thickness, color];

		this.enabledInput.setState(state.enabled);
		this.thicknessInput.setState(state.thickness);
		this.colorInput.setState(state.color);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			thickness: this.thicknessInput.state.value,
			color: this.colorInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		thickness: this.thicknessInput.state,
	// 		color: this.colorInput.state
	// 	};
	// }
}

module.exports = OutlineFilter;
