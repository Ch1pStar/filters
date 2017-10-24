const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class DotFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const scale = (this.scaleInput = new InputRange());
		const angle = (this.angleInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, scale, angle];

		this.enabledInput.setState(state.enabled);
		this.scaleInput.setState(state.scale);
		this.angleInput.setState(state.angle);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			scale: this.scaleInput.state.value,
			angle: this.angleInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			scale: this.scaleInput.state,
			angle: this.angleInput.state
		};
	}
}

module.exports = DotFilter;
