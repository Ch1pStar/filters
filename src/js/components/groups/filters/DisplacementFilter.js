const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class DisplacementFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const scaleX = (this.scaleXInput = new InputRange());
		const scaleY = (this.scaleYInput = new InputRange());
		this.inputs = [enabled, scaleX, scaleY];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.scaleXInput.setState(state.scaleX);
		this.scaleYInput.setState(state.scaleY);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			scaleX: this.scaleXInput.state.value,
			scaleY: this.scaleYInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			scaleX: this.scaleXInput.state,
			scaleY: this.scaleYInput.state
		};
	}
}

module.exports = DisplacementFilter;
