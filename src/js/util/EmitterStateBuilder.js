const PIXI = require('pixi.js');

const headTemplate = require('../../templates/components/emitter/head.hbs');
const footerTemplate = require('../../templates/components/emitter/footer.hbs');
const emitterStartTemplate = require('../../templates/components/emitter/EmitterStart.hbs');
const emitterStopTemplate = require('../../templates/components/emitter/EmitterStop.hbs');
const emitterDestroyTemplate = require('../../templates/components/emitter/EmitterDestroy.hbs');
const particleTexturesTemplate = require('../../templates/components/emitter/ParticleTextures.hbs');

// const alphaTemplate = require('../../templates/components/emitter/effects/Alpha.hbs');
// const attractionTemplate = require('../../templates/components/emitter/effects/Attraction.hbs');
// const blendModeTemplate = require('../../templates/components/emitter/effects/BlendMode.hbs');
// const circleZoneTemplate = require('../../templates/components/emitter/effects/CircleZone.hbs');
// const forceTemplate = require('../../templates/components/emitter/effects/Force.hbs');
// const gravityTemplate = require('../../templates/components/emitter/effects/Gravity.hbs');
// const gravityWellTemplate = require('../../templates/components/emitter/effects/GravityWell.hbs');
// const lifeTemplate = require('../../templates/components/emitter/effects/Life.hbs');
// const lineZoneTemplate = require('../../templates/components/emitter/effects/LineZone.hbs');
// const massTemplate = require('../../templates/components/emitter/effects/Mass.hbs');
// const radiusTemplate = require('../../templates/components/emitter/effects/Radius.hbs');
// const randomDriftTemplate = require('../../templates/components/emitter/effects/RandomDrift.hbs');
// const rateTemplate = require('../../templates/components/emitter/effects/Rate.hbs');
// const rectZoneTemplate = require('../../templates/components/emitter/effects/RectZone.hbs');
// const repulsionTemplate = require('../../templates/components/emitter/effects/Repulsion.hbs');
// const rotateTemplate = require('../../templates/components/emitter/effects/Rotate.hbs');
// const scaleTemplate = require('../../templates/components/emitter/effects/Scale.hbs');
// const velocityTemplate = require('../../templates/components/emitter/effects/Velocity.hbs');

class EmitterStateBuilder {
	effectTemplates = {
		// Alpha: alphaTemplate,
		// Attraction: attractionTemplate,
		// BlendMode: blendModeTemplate,
		// CircleZone: circleZoneTemplate,
		// Force: forceTemplate,
		// Gravity: gravityTemplate,
		// GravityWell: gravityWellTemplate,
		// Life: lifeTemplate,
		// LineZone: lineZoneTemplate,
		// Mass: massTemplate,
		// Radius: radiusTemplate,
		// RandomDrift: randomDriftTemplate,
		// Rate: rateTemplate,
		// RectZone: rectZoneTemplate,
		// Repulsion: repulsionTemplate,
		// Rotate: rotateTemplate,
		// Scale: scaleTemplate,
		// Velocity: velocityTemplate,
	};

	emitterTemplate = {
		head: '',
		body: '',
		footer: '',
		emitterStart: emitterStartTemplate,
		emitterStop: emitterStopTemplate,
		emitterDestroy: emitterDestroyTemplate,
		particleTextures: particleTexturesTemplate
	};

	emitterParams = {
		emitterZone: 'emitterZone'
	};

	effectMarkers = null;

	constructor() {}

	set effects(effects) {
		let bodyStr = '';

		this.effectMarkers = new PIXI.Container();
		this._effects = effects;
		for (const effect in effects) {
			const effectAttributes = effects[effect];

			bodyStr += this.effectTemplates[effect](effectAttributes);
			if (effectAttributes.x && effectAttributes.y) {
				if (effectAttributes.width && effectAttributes.height) {
					this.effectMarkers.addChild(
						this._createZoneMarker(
							effect,
							effectAttributes.x,
							effectAttributes.y,
							effectAttributes.width,
							effectAttributes.height
						)
					);
				} else {
					this.effectMarkers.addChild(
						this._createPointMarker(effect, effectAttributes.x, effectAttributes.y)
					);
				}
			}
		}

		this.emitterTemplate.head = headTemplate(effects);
		this.emitterTemplate.body = bodyStr;
		this.emitterTemplate.footer = footerTemplate(effects);
	}

	get previewState() {
		return this.emitterTemplate.head + this.emitterTemplate.body + this.emitterTemplate.footer;
	}

	get actionScriptState() {
		return (
			this.emitterTemplate.particleTextures(this.emitterParams) +
			this.emitterTemplate.head.replace(/.stage/g, '') +
			this.emitterTemplate.body +
			this.emitterTemplate.footer +
			this.emitterStartState
		);
	}

	get emitterStopState() {
		return this.emitterTemplate.emitterStop(this.emitterParams);
	}

	get emitterDestroyState() {
		return this.emitterTemplate.emitterDestroy(this.emitterParams);
	}

	get emitterStartState() {
		return this.emitterTemplate.emitterStart(this.emitterParams);
	}

	_createPointMarker(label, x, y) {
		const cnt = new PIXI.Container();
		const marker = new PIXI.Graphics();
		const text = new PIXI.Text(label, {
			fill: 0x009900,
			fontSize: 10
		});

		marker.beginFill(0x478020);
		marker.drawCircle(0, 0, 4);
		marker.endFill();
		marker.x = x;
		marker.y = y;
		cnt.addChild(marker);

		text.x = x - text.width / 2;
		text.y = y + 10;
		cnt.addChild(text);

		cnt.cacheAsBitmap = true;

		return cnt;
	}

	_createZoneMarker(label, x, y, width, height) {
		const cnt = new PIXI.Container();
		const marker = new PIXI.Graphics();
		const text = new PIXI.Text(label, {
			fill: 0x009900,
			fontSize: 10
		});

		marker.lineStyle(2, 0x478020);
		marker.drawRect(0, 0, width, height);
		marker.x = x;
		marker.y = y;
		cnt.addChild(marker);

		text.x = x - text.width / 2;
		text.y = y + 10;
		cnt.addChild(text);

		cnt.cacheAsBitmap = true;

		return cnt;
	}
}

module.exports = EmitterStateBuilder;
