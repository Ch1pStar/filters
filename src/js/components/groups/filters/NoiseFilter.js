const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class NoiseFilter extends Group {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const noise = (this.noiseInput = new InputRange());
		const seed = (this.seedInput = new InputRange());
		const state = this.options;

		this.inputs = [enabled, noise, seed];

		this.enabledInput.setState(state.enabled);
		this.noiseInput.setState(state.noise);
		this.seedInput.setState(state.seed);
		super._initInput();
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			noise: this.noiseInput.state.value,
			seed: this.seedInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			noise: this.noiseInput.state,
			seed: this.seedInput.state
		};
	}
}

module.exports = NoiseFilter;
