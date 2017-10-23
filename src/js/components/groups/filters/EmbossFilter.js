const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class EmbossFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const strength = (this.strengthInput = new InputRange());
		this.inputs = [enabled, strength];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.strengthInput.setState(state.strength);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			strength: this.strengthInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			strength: this.strengthInput.state
		};
	}
}

module.exports = EmbossFilter;
