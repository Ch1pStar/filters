const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class AsciiFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const size = (this.sizeInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, size];

		this.enabledInput.setState(state.enabled);
		this.sizeInput.setState(state.size);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			size: this.sizeInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			size: this.sizeInput.state
		};
	}
}

module.exports = AsciiFilter;
