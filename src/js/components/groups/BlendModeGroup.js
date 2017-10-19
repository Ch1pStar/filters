const Group = require('./abstract/Group');
const Select = require('dope-components').Select;

class BlendModeGroup extends Group {
	_initInput() {
		const blendMode = (this.blendModeInput = new Select());

		this.inputs = [blendMode];
		super._initInput();
	}

	setState() {
		this.blendModeInput.setState(this.options.blendMode);
	}

	get fields() {
		return {
			blendMode: this.blendModeInput.state.value
		};
	}

	get state() {
		return {
			blendMode: this.blendModeInput.state
		};
	}
}

module.exports = BlendModeGroup;
