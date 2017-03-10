const InputGroup = require('./InputGroup');

class RadiusGroup extends InputGroup {

	constructor(parent) {
		super('Radius');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 5,
			range: [0.1, 10],
		};
	}

	_initFields() {
		this._panel.addSlider(this.fields, this.label, 'range', { step: 0.1 });
	}

	get value() {
		return `emitter.addInitialize(new Proton.Radius(${this.fields[this.label]}));`;
	}
}

module.exports = RadiusGroup;
