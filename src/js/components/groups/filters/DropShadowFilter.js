const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const InputColor = require('dope-components').InputColor;
const Checkbox = require('dope-components').Checkbox;

class DropShadowFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const blur = (this.blurInput = new InputRange());
		const alpha = (this.alphaInput = new InputRange());
		const distance = (this.distanceInput = new InputRange());
		const rotation = (this.rotationInput = new InputRange());
		const color = (this.colorInput = new InputColor());
		const state = this.options;

		this.inputs = [enabled, blur, alpha, distance, rotation, color];

		this.enabledInput.setState(state.enabled);
		this.blurInput.setState(state.blur);
		this.alphaInput.setState(state.alpha);
		this.distanceInput.setState(state.distance);
		this.rotationInput.setState(state.rotation);
		this.colorInput.setState(state.color);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			blur: this.blurInput.state.value,
			alpha: this.alphaInput.state.value,
			distance: this.distanceInput.state.value,
			rotation: this.rotationInput.state.value,
			color: this.colorInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		blur: this.blurInput.state,
	// 		alpha: this.alphaInput.state,
	// 		distance: this.distanceInput.state,
	// 		rotation: this.rotationInput.state,
	// 		color: this.colorInput.state
	// 	};
	// }
}

module.exports = DropShadowFilter;
