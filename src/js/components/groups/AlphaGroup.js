const InputGroup = require('./InputGroup');

class AlphaGroup extends InputGroup {

	constructor(parent) {
		super('Alpha');
		this.parentComponent = parent;

		this.fields = {
			min: 0,
			max: 1,
			life: Infinity,
			_lifeRange: [0.1, 10],
		};
	}

	_initFields() {
		this._panel.addStringInput(this._fields, 'min');
		this._panel.addStringInput(this._fields, 'max');
		this._panel.addSlider(this._fields, 'life', '_lifeRange', { step: 0.5 });
	}

	get value() {
		return `emitter.addBehaviour(new Quark.Alpha(${this.fields.min}, ${this.fields.max}, ${this.fields.life}, Quark.easeOutCubic));`;
	}
}

module.exports = AlphaGroup;
