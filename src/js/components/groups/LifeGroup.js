const InputGroup = require('./InputGroup');

class LifeGroup extends InputGroup {

	constructor(parent) {
		super('Life');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 6,
			_range: [0.1, 10],
		};
	}

	_initFields() {
		this._panel.addSlider(this._fields, this.label, '_range', { step: 0.1 });
	}

	get value() {
		return `emitter.addInitialize(new Proton.Life(${this.fields[this.label]}));`;
	}
}

module.exports = LifeGroup;
