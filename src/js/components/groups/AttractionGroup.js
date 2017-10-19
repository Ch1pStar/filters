const Group = require('./abstract/Group');
const InputRange = require('dope-components').InputRange;

class AttractionGroup extends Group {
	_initInput() {
		const x = (this.xInput = new InputRange());
		const y = (this.yInput = new InputRange());
		const force = (this.forceInput = new InputRange());

		this.inputs = [x, y, force];
		super._initInput();
	}

	setState() {
		const state = this.options;

		this.xInput.setState(state.x);
		this.yInput.setState(state.y);
		this.forceInput.setState(state.force);
	}

	get fields() {
		return {
			x: this.xInput.state.value,
			y: this.yInput.state.value,
			force: this.forceInput.state.value,
			life: 0,
			radius: 0
		};
	}

	get state() {
		return {
			x: this.xInput.state,
			y: this.yInput.state,
			force: this.forceInput.state
		};
	}
}

module.exports = AttractionGroup;
