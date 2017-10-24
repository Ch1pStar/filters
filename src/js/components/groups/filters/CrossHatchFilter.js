const Group = require('../abstract/Group');
const Checkbox = require('dope-components').Checkbox;

class CrossHatchFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const state = this.options;
		this.inputs = [enabled];
		this.enabledInput.setState(state.enabled);
		super._initInput();
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
