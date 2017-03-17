const InputGroup = require('./InputGroup');

class RectZoneGroup extends InputGroup {

	constructor(parent) {
		super('RectZone');
		this.parentComponent = parent;

		this.fields = {
			x: 115,
			y: 44,
			width: 140,
			height: 270,
			_yRange: [0, 1080],
			_xRange: [0, 1920],
			_widthRange: [1, 1000],
			_heightRange: [1, 1000],
			type: 'BOUND',
			_typeOptions: ['BOUND', 'DEAD', 'CROSS', 'emit'],
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'x', '_xRange', { step: 1 });
		this._panel.addSlider(fields, 'y', '_yRange', { step: 1 });
		this._panel.addSlider(fields, 'width', '_widthRange', { step: 1 });
		this._panel.addSlider(fields, 'height', '_heightRange', { step: 1 });

		this._panel.addSelect(fields, '_typeOptions', { label: 'Type', target: 'type' });
	}

	get value() {
		const fields = this.fields;

		if(fields.type === 'emit'){
			return `emitter.addInitialize(new Proton.Position(new Proton.RectZone(${fields.x}, ${fields.y}, ${fields.width}, ${fields.height})));`;
		}

		return `emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(${fields.x}, ${fields.y}, ${fields.width}, ${fields.height}), Proton.CrossZone.CROSS_TYPES.${fields.type}));`;
	}
}

module.exports = RectZoneGroup;
