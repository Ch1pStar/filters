const InputGroup = require('./InputGroup');

class RepulsionGroup extends InputGroup {

	constructor(parent) {
		super('Repulsion');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			_yRange: [0, 1080],
			_xRange: [0, 1920],
			force: 15,
			_forceRange: [1, 100],
			radius: 1,
			_radiusRange: [0, 10],
			life: 100000000,
			_lifeRange: [10, 10000],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x', '_xRange', { step: 1 });
		this._panel.addSlider(fields, 'y', '_yRange', { step: 1 });

		this._panel.addSlider(fields, 'force', '_forceRange', { step: 5 });
		this._panel.addSlider(fields, 'radius', '_radiusRange', { step: 0.5 });
		this._panel.addSlider(fields, 'life', '_lifeRange', { step: 10 });
	}

	get value() {
		const fields = this.fields;

		// return `emitter.addBehaviour(new Quark.Repulsion({x:${fields.x}, y:${fields.y}},
		// ${fields.force}, ${fields.radius}, ${fields.life}));`;

		return `emitter.addBehaviour(new Quark.Repulsion({x:${fields.x}, y:${fields.y}}, 
		${fields.force}));`;
	}
}

module.exports = RepulsionGroup;
