const DopeGroup = require('../../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class TwistFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const angle = (this.angleInput = new InputRange());
		const radius = (this.radiusInput = new InputRange());
		const x = (this.xInput = new InputRange());
		const y = (this.yInput = new InputRange());
		this.inputs = [enabled, angle, radius, x, y];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.angleInput.setState(state.angle);
		this.radiusInput.setState(state.radius);
		this.xInput.setState(state.x);
		this.yInput.setState(state.y);
	}
	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			angle: this.angleInput.state.value,
			radius: this.radiusInput.state.value,
			x: this.xInput.state.value,
			y: this.yInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			angle: this.angleInput.state,
			radius: this.radiusInput.state,
			x: this.xInput.state,
			y: this.yInput.state
		};
	}
}

module.exports = TwistFilter;