const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class AsciiFilter extends Group {
	_initInput() {
		const size = (this.sizeInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, size];

		this.sizeInput.setState(state.size);
		super._initInput();
	}

	get fields() {
		return {
			size: this.sizeInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		size: this.sizeInput.state
	// 	};
	// }
}

module.exports = AsciiFilter;
