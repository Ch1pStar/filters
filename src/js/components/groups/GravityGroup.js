const InputGroup = require('./InputGroup');


class GravityGroup extends InputGroup{

	constructor(parent) {
		super('Gravity');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 8,
			range: [-20,20],
		};
	}

	_initFields() {
		this._panel.addSlider(this.fields, this.label, 'range', {step: .5});
	}

	get value() {
		return `emitter.addBehaviour(new Proton.Gravity(${this.fields[this.label]}));`;
	}
}

module.exports = GravityGroup;