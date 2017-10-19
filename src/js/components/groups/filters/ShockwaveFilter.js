const Group = require('./abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class ShockwaveFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const time = (this.timeInput = new InputRange());
		const centerX = (this.centerXInput = new InputRange());
		const centerY = (this.centerYInput = new InputRange());
		this.inputs = [enabled, time, centerX, centerY];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.timeInput.setState(state.time);
		this.centerXInput.setState(state.centerX);
		this.centerYInput.setState(state.centerY);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			time: this.timeInput.state.value,
			centerX: this.centerXInput.state.value,
			centerY: this.centerYInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			time: this.timeInput.state,
			centerX: this.centerXInput.state,
			centerY: this.centerYInput.state
		};
	}
}

module.exports = ShockwaveFilter;
