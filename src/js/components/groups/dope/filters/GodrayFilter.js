const DopeGroup = require('../../abstract/DopeGroup');
const InputRange = require('dope-components').InputRange;
const Checkbox = require('dope-components').Checkbox;

class GodrayFilter extends DopeGroup {
	_initInput() {
		const enabled = (this.enabledInput = new Checkbox());
		const time = (this.timeInput = new InputRange());
		const angle = (this.angleInput = new InputRange());
		const gain = (this.gainInput = new InputRange());
		const lacunarity = (this.lacunarityInput = new InputRange());
		this.inputs = [enabled, time, angle, gain, lacunarity];
		super._initInput();
	}

	setState() {
		const state = this.options;
		this.enabledInput.setState(state.enabled);
		this.timeInput.setState(state.time);
		this.angleInput.setState(state.angle);
		this.gainInput.setState(state.gain);
		this.lacunarityInput.setState(state.lacunarity);
	}

	get fields() {
		return {
			enabled: this.enabledInput.state.value,
			time: this.timeInput.state.value,
			angle: this.angleInput.state.value,
			gain: this.gainInput.state.value,
			lacunarity: this.lacunarityInput.state.value
		};
	}

	get state() {
		return {
			enabled: this.enabledInput.state,
			time: this.timeInput.state,
			angle: this.angleInput.state,
			gain: this.gainInput.state,
			lacunarity: this.lacunarityInput.state
		};
	}
}

module.exports = GodrayFilter;
