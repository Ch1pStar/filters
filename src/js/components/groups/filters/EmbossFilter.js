const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class EmbossFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const strength = (this.strengthInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, strength];

		this.enabledInput.setState(state.enabled);
		this.strengthInput.setState(state.strength);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			strength: this.strengthInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		strength: this.strengthInput.state
	// 	};
	// }
}

module.exports = EmbossFilter;
