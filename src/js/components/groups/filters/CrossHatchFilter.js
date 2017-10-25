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
}

module.exports = CrossHatchFilter;
