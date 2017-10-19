const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class RGBSplitFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const redX = (this.redXInput = new InputRange());
		const redY = (this.redYInput = new InputRange());
		const greenX = (this.greenXInput = new InputRange());
		const greenY = (this.greenYInput = new InputRange());
		const blueX = (this.blueXInput = new InputRange());
		const blueY = (this.blueYInput = new InputRange());
		this.inputs = [enabled, redX, redY, greenX, greenY, blueX, blueY];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.redXInput.setState(state.redX);
		this.redYInput.setState(state.redY);
		this.greenXInput.setState(state.greenX);
		this.greenYInput.setState(state.greenY);
		this.blueXInput.setState(state.blueX);
		this.blueYInput.setState(state.blueY);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			redX: this.redXInput.state.value,
			redY: this.redYInput.state.value,
			greenX: this.greenXInput.state.value,
			greenY: this.greenYInput.state.value,
			blueX: this.blueXInput.state.value,
			blueY: this.blueYInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			redX: this.redXInput.state,
			redY: this.redYInput.state,
			greenX: this.greenXInput.state,
			greenY: this.greenYInput.state,
			blueX: this.blueXInput.state,
			blueY: this.blueYInput.state
		};
	}
}

module.exports = RGBSplitFilter;
