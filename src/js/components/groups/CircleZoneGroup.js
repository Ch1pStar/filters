const InputGroup = require('./InputGroup');

class CircleZoneGroup extends InputGroup {

	constructor(parent) {
		super('CircleZone');
		this.parentComponent = parent;

		this.fields = {
			x: 300,
			y: 250,
			_yRange: [0, 1080],
			_xRange: [0, 1920],
			radius: 100,
			type: 'BOUND',
			_typeOptions: ['BOUND', 'DEAD', 'CROSS', 'emit'],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x', '_xRange', { step: 1 });
		this._panel.addSlider(fields, 'y', '_yRange', { step: 1 });
		this._panel.addStringInput(fields, 'radius', { label:  'radius:' });

		this._panel.addSelect(fields, '_typeOptions', { target: 'type' });
	}

	get value() {
		const fields = this.fields;

		if (fields.type === 'emit') {
			return `emitter.addInitialize(new Quark.Position(new Quark.CircleZone(${fields.x}, ${fields.y}, ${fields.radius})));`;
		}

		return `emitter.addBehaviour(new Quark.CrossZone(new Quark.CircleZone(${fields.x}, ${fields.y}, ${fields.radius}), Quark.CrossZone.CROSS_TYPES.${fields.type}));`;
	}
}

module.exports = CircleZoneGroup;
