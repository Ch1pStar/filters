const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class DisplacementFilter extends Group {
	_initInput() {
		const scaleX = (this.scaleXInput = new InputRange());
		const scaleY = (this.scaleYInput = new InputRange());
		const state = this.options;

		this.inputs = [scaleX, scaleY];

		this.scaleXInput.setState(state.scaleX);
		this.scaleYInput.setState(state.scaleY);
		super._initInput();
	}

	get fields() {
		return {
			scaleX: this.scaleXInput.state.value,
			scaleY: this.scaleYInput.state.value,
		};
	}
}

module.exports = DisplacementFilter;
