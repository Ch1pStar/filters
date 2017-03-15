const InputGroup = require('./InputGroup');

class RectZoneGroup extends InputGroup {

	constructor(parent) {
		super('RectZone');
		this.parentComponent = parent;

		this.fields = {
			x: 1,
			y: 1,
			width: 200,
			height: 100,
			type: 'bound',
			typeOptions: ['bound', 'dead', 'cross', 'emit'],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'x', { label:  'X:' });
		this._panel.addStringInput(fields, 'y', { label:  'Y:' });
		this._panel.addStringInput(fields, 'width', { label:  'width:' });
		this._panel.addStringInput(fields, 'height', { label:  'height:' });

		this._panel.addSelect(fields, 'typeOptions', { label: 'Type', target: 'type' });
	}

	get value() {
		const fields = this.fields;

		if(fields.type === 'emit'){
			return `emitter.addInitialize(new Proton.Position(new Proton.RectZone(${fields.x}, ${fields.y}, ${fields.width}, ${fields.height})));`;
		}

		return `emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(${fields.x}, ${fields.y}, ${fields.width}, ${fields.height}), '${fields.type}'));`;
	}
}

module.exports = RectZoneGroup;
