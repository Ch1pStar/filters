const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class PixelateFilter extends Group {
	_initInput() {
		const sizeX = (this.sizeXInput = new InputRange());
		const sizeY = (this.sizeYInput = new InputRange());
		const state = this.options;

		this.inputs = [sizeX, sizeY];

		this.sizeXInput.setState(state.sizeX);
		this.sizeYInput.setState(state.sizeY);
		super._initInput();
	}

	get fields() {
		return {
			sizeX: this.sizeXInput.state.value,
			sizeY: this.sizeYInput.state.value,
		};
	}
}

module.exports = PixelateFilter;
