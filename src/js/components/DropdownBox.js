const Box = require('./Box');
const ControlKit = require('controlkit');
// const RepulsionGroup = require('./groups/RepulsionGroup');
// const RectZoneGroup = require('./groups/RectZoneGroup');
// const CircleZoneGroup = require('./groups/CircleZoneGroup');
// const LineZoneGroup = require('./groups/LineZoneGroup');
// const ForceGroup = require('./groups/ForceGroup');
// const RotateGroup = require('./groups/RotateGroup');
// const ScaleGroup = require('./groups/ScaleGroup');
// const GravityWellGroup = require('./groups/GravityWellGroup');
// const RandomDriftGroup = require('./groups/RandomDriftGroup');

// const AlphaGroup = require('./groups/dope/AlphaGroup');
// const BlendModeGroup = require('./groups/dope/BlendModeGroup');
// const AttractionGroup = require('./groups/dope/AttractionGroup');
const GlowFilter = require('./groups/filters/GlowFilter');
const DisplacementFilter = require('./groups/filters/DisplacementFilter');
const BlurFilter = require('./groups/filters/BlurFilter');
const NoiseFilter = require('./groups/filters/NoiseFilter');
const ColorMatrixFilter = require('./groups/filters/ColorMatrixFilter');
const OutlineFilter = require('./groups/filters/OutlineFilter');
const DropShadowFilter = require('./groups/filters/DropShadowFilter');
const TwistFilter = require('./groups/filters/TwistFilter');
const AsciiFilter = require('./groups/filters/AsciiFilter');
const DotFilter = require('./groups/filters/DotFilter');
const EmbossFilter = require('./groups/filters/EmbossFilter');
const PixelateFilter = require('./groups/filters/PixelateFilter');
const RGBSplitFilter = require('./groups/filters/RGBSplitFilter');
const CrossHatchFilter = require('./groups/filters/CrossHatchFilter');
const ConvolutionFilter = require('./groups/filters/ConvolutionFilter');
const BloomFilter = require('./groups/filters/BloomFilter');
const TiltShiftFilter = require('./groups/filters/TiltShiftFilter');
const ShockwaveFilter = require('./groups/filters/ShockwaveFilter');
const BulgePinchFilter = require('./groups/filters/BulgePinchFilter');
const ColorReplaceFilter = require('./groups/filters/ColorReplaceFilter');
const MultiColorReplaceFilter = require('./groups/filters/MultiColorReplaceFilter');
const SimpleLightmapFilter = require('./groups/filters/SimpleLightmapFilter');
const GodrayFilter = require('./groups/filters/GodrayFilter');
const ZoomBlurFilter = require('./groups/filters/ZoomBlurFilter');

const template = require('../../templates/components/DropdownBox.hbs');

class DropdownBox extends Box {
	/** @type {Object} List of events this class will dispatch */
	static events = {
		ADD: 'effect_add',
		REMOVE: 'dropwdown_effect_remove'
	};

	constructor(parent) {
		super({}, template);

		this.parent = parent;

		this.container.classList.add('dropdown-component-container');
		this.render();

		this.initEffectOptions();
	}

	initEffectOptions() {
		requestAnimationFrame(() => {
			const items = Array.prototype.slice.call(this.container.querySelectorAll('li'));

			items.forEach(option => {
				const effectType = option.dataset.effectType;

				if (this.groupExits(effectType)) option.classList.add('active');

				option.addEventListener('click', e => {
					if (this.groupExits(effectType)) {
						this.emit(DropdownBox.events.REMOVE, this.getGroup(effectType));
					} else {
						const group = new this.parent.inputGroups[effectType](
							this.parent.stateManager.state[effectType]
						);

						this.emit(DropdownBox.events.ADD, group);
					}
					this.parent.hideDropdown();
				});
			});
		});
	}

	groupExits(label) {
		const groups = this.parent.groups;

		for (let i = 0; i < groups.length; i++) {
			if (groups[i].label === label) return true;
		}

		return false;
	}

	getGroup(label) {
		const groups = this.parent.groups;

		for (let i = 0; i < groups.length; i++) {
			if (groups[i].label === label) return groups[i];
		}

		return null;
	}
}

module.exports = DropdownBox;
