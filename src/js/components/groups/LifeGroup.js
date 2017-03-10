const InputGroup = require('./InputGroup');


class LifeGroup extends InputGroup{

	constructor(parent) {
		super('Life');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 2,
			range: [.1,10],
		};
	}

	_initFields() {
		this._panel.addSlider(this.fields, this.label, 'range', {step: .1});
	}

	get value() {
		return `emitter.addInitialize(new Proton.Life(${this.fields[this.label]}));`;
	}
}

module.exports = LifeGroup;