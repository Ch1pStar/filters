const InputGroup = require('./InputGroup');

class MassGroup extends InputGroup {

	constructor(parent) {
		super('Mass');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 1,
			_range: [0.1, 10],
		};
	}

	_initFields() {
		const fields = this._fields;

		window.slider = this._panel.addSlider(fields, this.label, '_range', { step: 0.1 });
	}

	get value() {
		return `emitter.addInitialize(new Proton.Mass(${this.fields[this.label]}));`;
	}
}

module.exports = MassGroup;
