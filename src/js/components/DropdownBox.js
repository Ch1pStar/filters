const Box = require('./Box');
const ControlKit = require('controlkit');
const InputGroup = require('./groups/InputGroup');
const AlphaGroup = require('./groups/AlphaGroup');
const AttractionGroup = require('./groups/AttractionGroup');
const RepulsionGroup = require('./groups/RepulsionGroup');
const RectZoneGroup = require('./groups/RectZoneGroup');
const CircleZoneGroup = require('./groups/CircleZoneGroup');
const LineZoneGroup = require('./groups/LineZoneGroup');
const ForceGroup = require('./groups/ForceGroup');
const RotateGroup = require('./groups/RotateGroup');
const ScaleGroup = require('./groups/ScaleGroup');
const GravityWellGroup = require('./groups/GravityWellGroup');
const RandomDriftGroup = require('./groups/RandomDriftGroup');
const BlendModeGroup = require('./groups/BlendModeGroup');
const template = require('../../templates/components/BehavioursDropdown.hbs');

class DropdownBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		ADD: 'effect_add',
		REMOVE: 'dropwdown_effect_remove',
	};

	inputGroups = {
		Alpha: AlphaGroup,
		Attraction: AttractionGroup,
		Repulsion: RepulsionGroup,
		RectZone: RectZoneGroup,
		CircleZone: CircleZoneGroup,
		LineZone: LineZoneGroup,
		Force: ForceGroup,
		Rotate: RotateGroup,
		Scale: ScaleGroup,
		GravityWell: GravityWellGroup,
		RandomDrift: RandomDriftGroup,
		BlendMode: BlendModeGroup,
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

			items.forEach((option) => {
				option.addEventListener('click', (e) => {
					const effectType = option.dataset.effectType;

					if (this._groupExits(effectType)) {
						this.emit(DropdownBox.events.REMOVE, this._getGroup(effectType));
					} else {
						const group = new this.inputGroups[effectType](this.parent);

						this.emit(DropdownBox.events.ADD, group);
					}
					this.parent.hideDropdown();
				});
			});
		});
	}

	_groupExits(label) {
		const groups = this.parent.groups;

		for (let i = 0; i < groups.length; i++) {
			if (groups[i].label === label) return true;
		}

		return false;
	}

	_getGroup(label) {
		const groups = this.parent.groups;

		for (let i = 0; i < groups.length; i++) {
			if (groups[i].label === label) return groups[i];
		}

		return null;
	}
}

module.exports = DropdownBox;
