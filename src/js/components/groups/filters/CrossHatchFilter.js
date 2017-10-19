const Group = require('./abstract/Group');
const Checkbox = require('dope-components').Checkbox;

class CrossHatchFilter extends Grop {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		this.inputs = [enabled];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state
		};
	}
}

module.exports = CrossHatchFilter;
