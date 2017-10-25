const Group = require('../abstract/Group');
const Button = require('dope-components').Button;
const Checkbox = require('dope-components').Checkbox;

class ColorMatrixFilter extends Group {
	_initInput() {
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
		const state = this.options;

		this.inputs = [
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
			saturate,
		];

		this.resetInput.setState(state.reset);
		this.sepiaInput.setState(state.sepia);
		this.negativeInput.setState(state.negative);
		this.kodachromeInput.setState(state.kodachrome);
		this.lsdInput.setState(state.lsd);
		this.polaroidInput.setState(state.polaroid);
		this.desaturateInput.setState(state.desaturate);
		this.contrastInput.setState(state.contrast);
		this.greyscaleInput.setState(state.greyscale);
		this.predatorInput.setState(state.predator);
		this.saturateInput.setState(state.saturate);

		super._initInput();
	}

	get fields() {
		return {
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
			saturate: this.saturateInput.state.value,
		};
	}
}

module.exports = ColorMatrixFilter;
