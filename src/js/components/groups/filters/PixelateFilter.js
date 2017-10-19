const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class PixelateFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const sizeX = (this.sizeXInput = new InputRange());
		const sizeY = (this.sizeYInput = new InputRange());
		this.inputs = [enabled, sizeX, sizeY];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.sizeXInput.setState(state.sizeX);
		this.sizeYInput.setState(state.sizeY);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			sizeX: this.sizeXInput.state.value,
			sizeY: this.sizeYInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			sizeX: this.sizeXInput.state,
			sizeY: this.sizeYInput.state
		};
	}
}

module.exports = PixelateFilter;
