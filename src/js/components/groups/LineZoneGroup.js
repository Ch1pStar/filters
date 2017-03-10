const InputGroup = require('./InputGroup');

class LineZoneGroup extends InputGroup {

	constructor(parent) {
		super('LineZone');
		this.parentComponent = parent;

		this.fields = {
			x1: 1,
			y1: 1,
			x2: 200,
			y2: 100,
			direction: 'right',
			directionOptions: ['right', 'left'],
			type: 'bound',
			typeOptions: ['bound', 'dead'],
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addStringInput(fields, 'x1', { label:  'x1:' });
		this._panel.addStringInput(fields, 'y1', { label:  'y1:' });
		this._panel.addStringInput(fields, 'x2', { label:  'x2:' });
		this._panel.addStringInput(fields, 'y2', { label:  'y2:' });

		this._panel.addSelect(fields, 'directionOptions', { target: 'direction' });
		this._panel.addSelect(fields, 'typeOptions', { target: 'type' });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addBehaviour(new Proton.CrossZone(new Proton.LineZone(${fields.x1}, ${fields.y1}, ${fields.x2}, ${fields.y2}, ${fields.direction}), '${fields.type}'));`;
	}
}

module.exports = LineZoneGroup;
