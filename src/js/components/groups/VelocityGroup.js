const Group = require('./abstract/Group');
const InputRange = require('dope-components').InputRange;

class VelocityGroup extends Group {
	_initInput() {
		const speed = (this.speedInput = new InputRange());
		const minAngle = (this.minAngleInput = new InputRange());
		const maxAngle = (this.maxAngleInput = new InputRange());

		this.inputs = [speed, minAngle, maxAngle];
		super._initInput();
	}

	setState() {
		const state = this.options;

		this.speedInput.setState(state.speed);
		this.minAngleInput.setState(state.minAngle);
		this.maxAngleInput.setState(state.maxAngle);
	}

	get fields() {
		return {
			speed: this.speedInput.state.value,
			minAngle: this.minAngleInput.state.value,
			maxAngle: this.maxAngleInput.state.value,
			orientation: 'p'
		};
	}

	get state() {
		return {
			speed: this.speedInput.state,
			minAngle: this.minAngleInput.state,
			maxAngle: this.maxAngleInput.state
		};
	}
}

module.exports = VelocityGroup;
