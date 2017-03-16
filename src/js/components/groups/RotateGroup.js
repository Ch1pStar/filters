const InputGroup = require('./InputGroup');

class RotateGroup extends InputGroup {

	constructor(parent) {
		super('Rotate');
		this.parentComponent = parent;

		this.fields = {
			a: 'Velocity',
			b: 0,
			style: 'to',
			_styleRange: ['to', 'from'],
			life: 1,
			_lifeRange: [0.1, 10],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addStringInput(fields, 'a', { label:  'a:' });
		this._panel.addStringInput(fields, 'b', { label:  'b:' });
		this._panel.addSelect(fields, '_styleRange', { target: 'style' });

		this._panel.addSlider(fields, 'life', '_lifeRange', { step: 0.5 });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addBehaviour(new Proton.Rotate('${fields.a}', ${fields.b}, 
		'${fields.style}', ${fields.life}));`;
	}
}

module.exports = RotateGroup;
