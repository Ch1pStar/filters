const InputGroup = require('./InputGroup');

class VelocityGroup extends InputGroup {

	constructor(parent) {
		super('Velocity');
		this.parentComponent = parent;

		this.fields = {
			speed: 1,
			speedRange: [0.1, 10],
			minAngle: 0,
			maxAngle: 360,
			orientation: 'polar',
		};
	}

	_initFields() {
		const fields = this.fields;

		this._panel.addSlider(this.fields, 'speed', 'speedRange', { step: 0.1 });

		this._panel.addStringInput(fields, 'minAngle', { label:  'Arc start:' });
		this._panel.addStringInput(fields, 'maxAngle', { label:  'Arc end:' });
	}

	get value() {
		const fields = this.fields;

		return `emitter.addInitialize(new Proton.Velocity(${fields.speed}, Proton.getSpan(${fields.minAngle}, ${fields.maxAngle}), '${fields.orientation}'));`;
	}
}

module.exports = VelocityGroup;
