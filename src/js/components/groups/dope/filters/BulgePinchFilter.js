const DopeGroup = require('../../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class BulgePinchFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const radius = (this.radiusInput = new InputRange());
		const strength = (this.strengthInput = new InputRange());
		const centerX = (this.centerXInput = new InputRange());
		const centerY = (this.centerYInput = new InputRange());
		this.inputs = [enabled, radius, strength, centerX, centerY];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.radiusInput.setState(state.radius);
		this.strengthInput.setState(state.strength);
		this.centerXInput.setState(state.centerX);
		this.centerYInput.setState(state.centerY);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			radius: this.radiusInput.state.value,
			strength: this.strengthInput.state.value,
			centerX: this.centerXInput.state.value,
			centerY: this.centerYInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			radius: this.radiusInput.state,
			strength: this.strengthInput.state,
			centerX: this.centerXInput.state,
			centerY: this.centerYInput.state
		};
	}
}

module.exports = BulgePinchFilter;