const InputGroup = require('./InputGroup');

class CircleZoneGroup extends InputGroup {

	constructor(parent) {
		super('CircleZone');
		this.parentComponent = parent;

		this.fields = {
			x: 1,
			y: 1,
			radius: 100,
			type: 'bound',
			typeOptions: ['bound', 'dead', 'cross', 'emit'],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });
		this._panel.addStringInput(fields, 'radius', { label:  'radius:' });

		this._panel.addSelect(fields, 'typeOptions', { target: 'type' });
	}

	get value() {
		const fields = this.fields;

		if(fields.type === 'emit'){
			return `emitter.addInitialize(new Proton.Position(new Proton.CircleZone(${fields.x}, ${fields.y}, ${fields.radius})));`;
		}

		return `emitter.addBehaviour(new Proton.CrossZone(new Proton.CircleZone(${fields.x}, ${fields.y}, ${fields.radius}), '${fields.type}'));`;
	}
}

module.exports = CircleZoneGroup;
