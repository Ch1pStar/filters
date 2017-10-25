const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class ShockwaveFilter extends Group {
	_initInput() {
		const time = (this.timeInput = new InputRange());
		const centerX = (this.centerXInput = new InputRange());
		const centerY = (this.centerYInput = new InputRange());
		const state = this.options;

		this.inputs = [time, centerX, centerY];

		this.timeInput.setState(state.time);
		this.centerXInput.setState(state.centerX);
		this.centerYInput.setState(state.centerY);
		super._initInput();
	}

	get fields() {
		return {
			time: this.timeInput.state.value,
			centerX: this.centerXInput.state.value,
			centerY: this.centerYInput.state.value,
		};
	}
}

module.exports = ShockwaveFilter;
