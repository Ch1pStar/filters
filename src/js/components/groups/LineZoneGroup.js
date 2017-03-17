const InputGroup = require('./InputGroup');

class LineZoneGroup extends InputGroup {

	constructor(parent) {
		super('LineZone');
		this.parentComponent = parent;

		this.fields = {
			x1: 100,
			y1: 250,
			_y1Range: [0, 1080],
			_x1Range: [0, 1920],
			x2: 300,
			y2: 250,
			_y2Range: [0, 1080],
			_x2Range: [0, 1920],
			direction: 1,
			_directionOptions: [1, 0],
			type: 'BOUND',
			_typeOptions: ['BOUND', 'DEAD', 'emit'],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x1', '_x1Range', { step: 1 });
		this._panel.addSlider(fields, 'y1', '_y1Range', { step: 1 });

		this._panel.addSlider(fields, 'x2', '_x2Range', { step: 1 });
		this._panel.addSlider(fields, 'y2', '_y2Range', { step: 1 });

		this._panel.addSelect(fields, '_directionOptions', { label:'Direction', target: 'direction' });
		this._panel.addSelect(fields, '_typeOptions', { label: 'Type',  target: 'type' });
	}

	get value() {
		const fields = this.fields;
		const direction = fields.direction === 'right'?1:0;

		if(fields.type === 'emit'){
			return `emitter.addInitialize(new Proton.Position(new Proton.LineZone(${fields.x1}, ${fields.y1}, ${fields.x2}, ${fields.y2})));`;
		}

		return `emitter.addBehaviour(new Proton.CrossZone(new Proton.LineZone(${fields.x1}, ${fields.y1}, ${fields.x2}, ${fields.y2}, ${direction}), Proton.CrossZone.CROSS_TYPES.${fields.type}));`;
	}
}

module.exports = LineZoneGroup;
