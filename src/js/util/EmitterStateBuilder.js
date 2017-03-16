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
		Rotate: rotateTemplate,
		Scale: scaleTemplate,
		Velocity: velocityTemplate,
	};

	emitterTemplate = {
		head: '',
		body: '',
		footer: '',
	};

	constructor(){

	}

	set effects(effects){
		let bodyStr = '';

		this._effects = effects;
		for(let effect in effects) {
			bodyStr += this.effectTemplates[effect](effects[effect]);
		}

		this.emitterTemplate.head = headTemplate(effects);
		this.emitterTemplate.body = bodyStr;
		this.emitterTemplate.footer = footerTemplate(effects);
	}

	get previewState(){
		return this.emitterTemplate.head + this.emitterTemplate.body + this.emitterTemplate.footer;
	}

}

module.exports = EmitterStateBuilder;
