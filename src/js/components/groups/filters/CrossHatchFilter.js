const Group = require('../abstract/Group');
const Checkbox = require('dope-components').Checkbox;

class CrossHatchFilter extends Group {
	_initInput() {
		const state = this.options;
		this.inputs = [enabled];
		super._initInput();
	}

	get fields() {
		return {};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state
	// 	};
	// }
}

module.exports = CrossHatchFilter;
