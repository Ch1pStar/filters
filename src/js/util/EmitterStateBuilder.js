const PIXI = require('pixi.js');
const Filters = require('pixi-filters');

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
const AsciiFilter = require('../../templates/components/emitter/effects/filters/AsciiFilter.hbs');
const BloomFilter = require('../../templates/components/emitter/effects/filters/BloomFilter.hbs');
const BlurFilter = require('../../templates/components/emitter/effects/filters/BlurFilter.hbs');
const BulgePinchFilter = require('../../templates/components/emitter/effects/filters/BulgePinchFilter.hbs');
const ColorMatrixFilter = require('../../templates/components/emitter/effects/filters/ColorMatrixFilter.hbs');
const ColorReplaceFilter = require('../../templates/components/emitter/effects/filters/ColorReplaceFilter.hbs');
const ConvolutionFilter = require('../../templates/components/emitter/effects/filters/ConvolutionFilter.hbs');
const CrossHatchFilter = require('../../templates/components/emitter/effects/filters/CrossHatchFilter.hbs');
const DisplacementFilter = require('../../templates/components/emitter/effects/filters/DisplacementFilter.hbs');
const DotFilter = require('../../templates/components/emitter/effects/filters/DotFilter.hbs');
const DropshadowFilter = require('../../templates/components/emitter/effects/filters/DropshadowFilter.hbs');
const EmbrossFilter = require('../../templates/components/emitter/effects/filters/EmbrossFilter.hbs');
const GlowFilter = require('../../templates/components/emitter/effects/filters/GlowFilter.hbs');
const GodrayFilter = require('../../templates/components/emitter/effects/filters/GodrayFilter.hbs');
const MultiColorReplacerFilter = require('../../templates/components/emitter/effects/filters/MultiColorReplacerFilter.hbs');
const NoiseFilter = require('../../templates/components/emitter/effects/filters/NoiseFilter.hbs');
const OutlineFilter = require('../../templates/components/emitter/effects/filters/OutlineFilter.hbs');
const PixelateFilter = require('../../templates/components/emitter/effects/filters/PixelateFilter.hbs');
const RGBSplitFilter = require('../../templates/components/emitter/effects/filters/RGBSplitFilter.hbs');
const ShockwaveFilter = require('../../templates/components/emitter/effects/filters/ShockwaveFilter.hbs');
const SimpleLightmapFilter = require('../../templates/components/emitter/effects/filters/SimpleLightmapFilter.hbs');
const TiltShiftFilter = require('../../templates/components/emitter/effects/filters/TiltShiftFilter.hbs');
const TwistFilter = require('../../templates/components/emitter/effects/filters/TwistFilter.hbs');
const ZoomBlurFilter = require('../../templates/components/emitter/effects/filters/ZoomBlurFilter.hbs');

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
		AsciiFilter,
		BloomFilter,
		BlurFilter,
		BulgePinchFilter,
		ColorMatrixFilter,
		ColorReplaceFilter,
		ConvolutionFilter,
		CrossHatchFilter,
		DisplacementFilter,
		DotFilter,
		DropshadowFilter,
		EmbrossFilter,
		GlowFilter,
		GodrayFilter,
		MultiColorReplacerFilter,
		NoiseFilter,
		OutlineFilter,
		PixelateFilter,
		RGBSplitFilter,
		ShockwaveFilter,
		SimpleLightmapFilter,
		TiltShiftFilter,
		TwistFilter,
		ZoomBlurFilter
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

		this._effects = effects;
		for (const effect in effects) {
			console.log('EFFECT: ', effect);
			const effectAttributes = effects[effect];

			bodyStr += this.effectTemplates[effect](effectAttributes);
		}

		console.log(bodyStr);

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
