const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;
const Checkbox = require('dope-components').Checkbox;

class ColorReplaceFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const originalColor = (this.originalColorInput = new InputColor());
		const newColor = (this.newColorInput = new InputColor());
		const epsilon = (this.epsilonInput = new InputRange());
		this.inputs = [enabled, originalColor, newColor, epsilon];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.originalColorInput.setState(state.originalColor);
		this.newColorInput.setState(state.newColor);
		this.epsilonInput.setState(state.epsilon);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			originalColor: this.originalColorInput.state.value,
			newColor: this.newColorInput.state.value,
			epsilon: this.epsilonInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			originalColor: this.originalColorInput.state,
			newColor: this.newColorInput.state,
			epsilon: this.epsilonInput.state
		};
	}
}

module.exports = ColorReplaceFilter;
