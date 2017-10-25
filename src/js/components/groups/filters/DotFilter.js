const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class DotFilter extends Group {
	_initInput() {
		const scale = (this.scaleInput = new InputRange());
		const angle = (this.angleInput = new InputRange());
		const state = this.options;

		this.inputs = [scale, angle];

		this.scaleInput.setState(state.scale);
		this.angleInput.setState(state.angle);
		super._initInput();
	}

	get fields() {
		return {
			scale: this.scaleInput.state.value,
			angle: this.angleInput.state.value,
		};
	}
}

module.exports = DotFilter;
