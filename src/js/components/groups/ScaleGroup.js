const InputGroup = require('./InputGroup');

class ScaleGroup extends InputGroup {

	constructor(parent) {
		super('Scale');
		this.parentComponent = parent;

		this.fields = {
			a: 1,
			b: 0,
			life: 1500,
			lifeRange: [1, 10000],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'a', { label:  'a:' });
		this._panel.addStringInput(fields, 'b', { label:  'b:' });

		this._panel.addSlider(fields, 'life', 'lifeRange', { step: 100 });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addBehaviour(new Proton.Scale(${fields.a}, ${fields.b}, ${fields.life}));`;
	}
}

module.exports = ScaleGroup;
