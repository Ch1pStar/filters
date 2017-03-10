const InputGroup = require('./InputGroup');

class AlphaGroup extends InputGroup {

	constructor(parent) {
		super('Alpha');
		this.parentComponent = parent;

		this.fields = {
			min: 0,
			max: 1,
			life: Infinity,
			lifeRange: [0.1, 10],
		};
	}

	_initFields() {
		this._panel.addStringInput(this.fields, 'min');
		this._panel.addStringInput(this.fields, 'max');
		this._panel.addSlider(this.fields, 'life', 'lifeRange', { step: 0.5 });
	}

	get value() {
		return `emitter.addBehaviour(new Proton.Alpha(${this.fields.min}, ${this.fields.max}, ${this.fields.life}, Proton.easeOutCubic));`;
	}
}

module.exports = AlphaGroup;
