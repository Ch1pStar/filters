const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class TwistFilter extends Group {
	_initInput() {
		const angle = (this.angleInput = new InputRange());
		const radius = (this.radiusInput = new InputRange());
		const x = (this.xInput = new InputRange());
		const y = (this.yInput = new InputRange());
		const state = this.options;

		this.inputs = [angle, radius, x, y];

		this.angleInput.setState(state.angle);
		this.radiusInput.setState(state.radius);
		this.xInput.setState(state.x);
		this.yInput.setState(state.y);
		super._initInput();
	}

	get fields() {
		return {
			angle: this.angleInput.state.value,
			radius: this.radiusInput.state.value,
			x: this.xInput.state.value,
			y: this.yInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		angle: this.angleInput.state,
	// 		radius: this.radiusInput.state,
	// 		x: this.xInput.state,
	// 		y: this.yInput.state
	// 	};
	// }
}

module.exports = TwistFilter;
