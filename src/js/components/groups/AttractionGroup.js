const InputGroup = require('./InputGroup');

class AttractionGroup extends InputGroup {

	constructor(parent) {
		super('Attraction');
		this.parentComponent = parent;

		this.fields = {
			x: 1,
			y: 1,
			force: 1,
			forceRange: [0, 10],
			radius: 1,
			radiusRange: [0, 10],
			life: 1,
			lifeRange: [0.1, 10],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });

		this._panel.addSlider(this.fields, 'force', 'forceRange', { step: 0.5 });
		this._panel.addSlider(this.fields, 'radius', 'radiusRange', { step: 0.5 });
		this._panel.addSlider(this.fields, 'life', 'lifeRange', { step: 0.5 });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addBehaviour(new Proton.Attraction({x:${fields.x}, y:${fields.y}}, 
		${fields.force}, ${fields.radius}, ${fields.life}));`;
	}
}

module.exports = AttractionGroup;
