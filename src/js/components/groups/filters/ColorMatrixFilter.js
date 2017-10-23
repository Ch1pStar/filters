const Group = require('../abstract/Group');
const Button = require('dope-components').Button;
const Checkbox = require('dope-components').Checkbox;

class ColorMatrixFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const reset = (this.resetInput = new Checkbox());
		const sepia = (this.sepiaInput = new Checkbox());
		const negative = (this.negativeInput = new Checkbox());
		const kodachrome = (this.kodachromeInput = new Checkbox());
		const lsd = (this.lsdInput = new Checkbox());
		const polaroid = (this.polaroidInput = new Checkbox());
		const desaturate = (this.desaturateInput = new Checkbox());
		const contrast = (this.contrastInput = new Checkbox());
		const greyscale = (this.greyscaleInput = new Checkbox());
		const predator = (this.predatorInput = new Checkbox());
		const saturate = (this.saturateInput = new Checkbox());
		this.inputs = [
			enabled,
			reset,
			sepia,
			negative,
			kodachrome,
			lsd,
			polaroid,
			desaturate,
			contrast,
			greyscale,
			predator,
			saturate
		];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.resetInput.setState(state.reset);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			reset: this.resetInput.state.value,
			sepia: this.sepiaInput.state.value,
			negative: this.negativeInput.state.value,
			kodachrome: this.kodachromeInput.state.value,
			lsd: this.lsdInput.state.value,
			polaroid: this.polaroidInput.state.value,
			desaturate: this.desaturateInput.state.value,
			contrast: this.contrastInput.state.value,
			greyscale: this.greyscaleInput.state.value,
			predator: this.predatorInput.state.value,
			saturate: this.saturateInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state.value,
			reset: this.resetInput.state,
			sepia: this.sepiaInput.state,
			negative: this.negativeInput.state,
			kodachrome: this.kodachromeInput.state,
			lsd: this.lsdInput.state,
			polaroid: this.polaroidInput.state,
			desaturate: this.desaturateInput.state,
			contrast: this.contrastInput.state,
			greyscale: this.greyscaleInput.state,
			predator: this.predatorInput.state,
			saturate: this.saturateInput.state
		};
	}
}

module.exports = ColorMatrixFilter;
