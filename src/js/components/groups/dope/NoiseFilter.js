const DopeGroup = require('../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class NoiseFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const noise = (this.noiseInput = new InputRange());
		const seed = (this.seedInput = new InputRange());
		this.inputs = [enabled, noise, seed];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.noiseInput.setState(state.noise);
		this.seedInput.setState(state.seed);
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
