const InputGroup = require('./InputGroup');

class MassGroup extends InputGroup{

	constructor(parent) {
		super('Mass');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 1,
			range: [0.1, 10],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addSlider(this.fields, this.label, 'range', {step: .1});
	}

	get value() {
		return `emitter.addInitialize(new Proton.Mass(${this.fields[this.label]}));`;
	}
}

module.exports = MassGroup;