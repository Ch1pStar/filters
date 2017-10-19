const DopeGroup = require('../../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;
const InputColor = require('dope-components').InputColor;

class MultiColorReplaceFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const original0 = (this.original0Input = new InputColor());
		const target0 = (this.target0Input = new InputColor());
		const original1 = (this.original1Input = new InputColor());
		const target1 = (this.target1Input = new InputColor());
		const original2 = (this.original2Input = new InputColor());
		const target2 = (this.target2Input = new InputColor());
		const epsilon = (this.epsilonInput = new InputRange());
		this.inputs = [enabled, original0, target0, original1, target1, original2, target2, epsilon];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.original0Input.setState(state.original0);
		this.target0Input.setState(state.target0);
		this.original1Input.setState(state.original1);
		this.target1Input.setState(state.target2);
		this.original2Input.setState(state.original2);
		this.target2Input.setState(state.target2);
		this.epsilonInput.setState(state.epsilon);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			original0: this.original0Input.state.value,
			target0: this.target0Input.state.value,
			original1: this.original1Input.state.value,
			target1: this.target1Input.state.value,
			original2: this.original2Input.state.value,
			target2: this.target2Input.state.value,
			epsilon: this.epsilonInput.state.value
		};
	}
	get state() {
		return {
			enabled: this.enabledInput.state,
			original0: this.original0Input.state,
			target0: this.target0Input.state,
			original1: this.original1Input.state,
			target1: this.target1Input.state,
			original2: this.original2Input.state,
			target2: this.target2Input.state,
			epsilon: this.epsilonInput.state
		};
	}
}

module.exports = MultiColorReplaceFilter;
