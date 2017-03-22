const InputGroup = require('./InputGroup');

class AttractionGroup extends InputGroup {

	constructor(parent) {
		super('Attraction');
		this.parentComponent = parent;

		this.fields = {
			x: 320,
			y: 350,
			_yRange: [0, 1080],
			_xRange: [0, 1920],
			force: 10,
			_forceRange: [0, 10],
			radius: 1,
			_radiusRange: [0, 10],
			life: 1,
			_lifeRange: [0.1, 10],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x', '_xRange', { step: 1 });
		this._panel.addSlider(fields, 'y', '_yRange', { step: 1 });

		this._panel.addSlider(fields, 'force', '_forceRange', { step: 0.5 });
		this._panel.addSlider(fields, 'radius', '_radiusRange', { step: 0.5 });
		this._panel.addSlider(fields, 'life', '_lifeRange', { step: 0.5 });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addBehaviour(new Proton.Attraction({x:${fields.x}, y:${fields.y}}, 
		${fields.force}, ${fields.radius}, ${fields.life}));`;
	}
}

module.exports = AttractionGroup;
