const InputGroup = require('./InputGroup');

class RepulsionGroup extends InputGroup {

	constructor(parent) {
		super('Repulsion');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			force: 15,
			forceRange: [1, 100],
			radius: 1,
			radiusRange: [0, 10],
			life: 100000000,
			lifeRange: [10, 10000],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });

		this._panel.addSlider(this.fields, 'force', 'forceRange', { step: 5 });
		this._panel.addSlider(this.fields, 'radius', 'radiusRange', { step: 0.5 });
		this._panel.addSlider(this.fields, 'life', 'lifeRange', { step: 10 });
	}

	get value() {
		const fields = this.fields;

		// return `emitter.addBehaviour(new Proton.Repulsion({x:${fields.x}, y:${fields.y}}, 
		// ${fields.force}, ${fields.radius}, ${fields.life}));`;

		return `emitter.addBehaviour(new Proton.Repulsion({x:${fields.x}, y:${fields.y}}, 
		${fields.force}));`;
	}
}

module.exports = RepulsionGroup;
