const Group = require('./abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class AsciiFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const size = (this.sizeInput = new InputRange());
		this.inputs = [enabled, size];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.sizeInput.setState(state.size);
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
