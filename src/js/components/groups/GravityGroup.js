const InputGroup = require('./InputGroup');

class GravityGroup extends InputGroup {

	constructor(parent) {
		super('Gravity');
		this.parentComponent = parent;

		this.fields = {
			[this.label]: 0,
			_range: [-20, 20],
		};
	}

	_initFields() {
		this._panel.addSlider(this._fields, this.label, '_range', { step: 0.5 });
	}

	get value() {
		return `emitter.addBehaviour(new Quark.Gravity(${this.fields[this.label]}));`;
	}
}

module.exports = GravityGroup;
