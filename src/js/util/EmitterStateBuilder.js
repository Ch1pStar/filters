const PIXI = require('pixi.js');

const headTemplate = require('../../templates/components/emitter/head.hbs');
const footerTemplate = require('../../templates/components/emitter/footer.hbs');
const alphaTemplate = require('../../templates/components/emitter/effects/Alpha.hbs');
const attractionTemplate = require('../../templates/components/emitter/effects/Attraction.hbs');
const blendModeTemplate = require('../../templates/components/emitter/effects/BlendMode.hbs');
const circleZoneTemplate = require('../../templates/components/emitter/effects/CircleZone.hbs');
const forceTemplate = require('../../templates/components/emitter/effects/Force.hbs');
const gravityTemplate = require('../../templates/components/emitter/effects/Gravity.hbs');
const gravityWellTemplate = require('../../templates/components/emitter/effects/GravityWell.hbs');
const lifeTemplate = require('../../templates/components/emitter/effects/Life.hbs');
const lineZoneTemplate = require('../../templates/components/emitter/effects/LineZone.hbs');
const massTemplate = require('../../templates/components/emitter/effects/Mass.hbs');
const radiusTemplate = require('../../templates/components/emitter/effects/Radius.hbs');
const randomDriftTemplate = require('../../templates/components/emitter/effects/RandomDrift.hbs');
const rateTemplate = require('../../templates/components/emitter/effects/Rate.hbs');
const rectZoneTemplate = require('../../templates/components/emitter/effects/RectZone.hbs');
const repulsionTemplate = require('../../templates/components/emitter/effects/Repulsion.hbs');
const rotateTemplate = require('../../templates/components/emitter/effects/Rotate.hbs');
const scaleTemplate = require('../../templates/components/emitter/effects/Scale.hbs');
const velocityTemplate = require('../../templates/components/emitter/effects/Velocity.hbs');

class EmitterStateBuilder{

	effectTemplates = {
		Alpha: alphaTemplate,
		Attraction: attractionTemplate,
		BlendMode: blendModeTemplate,
		CircleZone: circleZoneTemplate,
		Force: forceTemplate,
		Gravity: gravityTemplate,
		GravityWell: gravityWellTemplate,
		Life: lifeTemplate,
		LineZone: lineZoneTemplate,
		Mass: massTemplate,
		Radius: radiusTemplate,
		RandomDrift: randomDriftTemplate,
		Rate: rateTemplate,
		RectZone: rectZoneTemplate,
		Repulsion: repulsionTemplate,
		Rotate: rotateTemplate,
		Scale: scaleTemplate,
		Velocity: velocityTemplate,
	};

	emitterTemplate = {
		head: '',
		body: '',
		footer: '',
	};

	effectMarkers = null;

	constructor(){

	}

	set effects(effects){
		let bodyStr = '';

		this.effectMarkers = new PIXI.Container();
		this._effects = effects;
		for(let effect in effects) {
			const effectAttributes = effects[effect];

			bodyStr += this.effectTemplates[effect](effectAttributes);
			if(effectAttributes.x && effectAttributes.y){
				this._createPointMarker(effect, effectAttributes.x, effectAttributes.y);
			}
		}

		this.emitterTemplate.head = headTemplate(effects);
		this.emitterTemplate.body = bodyStr;
		this.emitterTemplate.footer = footerTemplate(effects);
	}

	get previewState(){
		return this.emitterTemplate.head + this.emitterTemplate.body + this.emitterTemplate.footer;
	}


	_createPointMarker(label, x, y) {
		const cnt = new PIXI.Container();
		const marker = new PIXI.Graphics();
		const text = new PIXI.Text(label, {
			fill: 0xFFFFFF
		});

		marker.beginFill(Math.random()*0xFFFFFF);
		marker.drawCircle(0,0, 10);
		marker.endFill();
		marker.x = x;
		marker.y = y;
		cnt.addChild(marker);

		text.x = x;
		text.y = y+10;
		cnt.addChild(text);

		this.effectMarkers.addChild(cnt);
	}

	_createZoneMarker(points) {

	}

}

module.exports = EmitterStateBuilder;
