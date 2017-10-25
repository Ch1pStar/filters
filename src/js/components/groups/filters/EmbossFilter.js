const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class EmbossFilter extends Group {
	_initInput() {
		const strength = (this.strengthInput = new InputRange());
		const state = this.options;

		this.inputs = [strength];

		this.strengthInput.setState(state.strength);
		super._initInput();
	}

	get fields() {
		return {
			strength: this.strengthInput.state.value,
		};
	}
}

module.exports = EmbossFilter;
