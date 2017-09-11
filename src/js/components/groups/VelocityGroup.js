const InputGroup = require('./InputGroup');

class VelocityGroup extends InputGroup {

	constructor(parent) {
		super('Velocity');
		this.parentComponent = parent;

		this.fields = {
			speed: 1,
			_speedRange: [0.1, 10],
			minAngle: 0,
			maxAngle: 360,
			orientation: 'polar',
		};
	}

	_initFields() {
		const fields = this._fields;

		this._panel.addSlider(fields, 'speed', '_speedRange', { step: 0.1 });

		this._panel.addStringInput(fields, 'minAngle', { label:  'Arc start:' });
		this._panel.addStringInput(fields, 'maxAngle', { label:  'Arc end:' });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addInitialize(new Quark.Velocity(${fields.speed}, Quark.getSpan(${fields.minAngle}, ${fields.maxAngle}), '${fields.orientation}'));`;
	}
}

module.exports = VelocityGroup;
