const Box = require('./Box');
const DropdownBox = require('./DropdownBox');

const template = require('../../templates/EffectsBox.hbs');
const buttonTemplate = require('../../templates/components/button.hbs');

const InputStateManager = require('./InputStateManager');
const Group = require('./groups/abstract/Group');

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

class EffetcsBox extends Box {
	/** @type {Object} List of events this class will dispatch */
	static events = {
		CHANGE: 'effect_change',
	};

	/**
	 * @type {ControlKit}
	 * @private
	 */
	_controlKit = null;

	inputGroups = {
		DisplacementFilter,
		GlowFilter,
		BlurFilter,
		NoiseFilter,
		ColorMatrixFilter,
		OutlineFilter,
		DropShadowFilter,
		TwistFilter,
		AsciiFilter,
		DotFilter,
		EmbossFilter,
		PixelateFilter,
		RGBSplitFilter,
		CrossHatchFilter,
		ConvolutionFilter,
		BloomFilter,
		TiltShiftFilter,
		ShockwaveFilter,
		BulgePinchFilter,
		ColorReplaceFilter,
		MultiColorReplaceFilter,
		SimpleLightmapFilter,
		GodrayFilter,
		ZoomBlurFilter,
	};

	properties = {};

	constructor(options) {
		super(options, template);

		this.groups = [];

		this.stateManager = new InputStateManager();

		this.container.classList.add('behaviours-component-container');

		this.hideDropdown = this.hideDropdown.bind(this);
		this.emitGroupsState = this.emitGroupsState.bind(this);

		window.e = this;
	}

	onRendered() {
		this.contentContainer = this.container.querySelector('.content .content-component');

		this._initGroups();
		this._initStateButtons();
	}

	_initGroups() {
		const state = this.stateManager.state;
		// default groups

		this._initDropdown();
	}

	emitGroupsState() {
		const output = {};
		const outputState = {};

		this.groups.forEach((gr) => {
			const groupState = gr.state;

			output[gr.label] = gr.fields;

			groupState.label = gr.label;
			outputState[gr.label] = groupState;
		});

		this.stateManager.setState(outputState);
		this.emit(EffetcsBox.events.CHANGE, output);
	}

	_addGroup(group) {
		this.contentContainer.appendChild(group.container);

		group.on(Group.events.REMOVE, (event) => {
			this._removeGroup(group);
			this.emitGroupsState();
		});

		group.on(Group.events.CHANGE, this.emitGroupsState);
		this.groups.push(group);

		return group;
	}

	_removeGroup(group) {
		this.contentContainer.removeChild(group.container);

		group.removeAllListeners(Group.events.CHANGE);
		this.groups.splice(this.groups.indexOf(group), 1);

		return group;
	}

	_clearGroups() {
		const groups = this.groups;

		groups.forEach((gr) => {
			this.contentContainer.removeChild(gr.container);
			gr.removeAllListeners(Group.events.CHANGE);
		});

		groups.length = 0;
	}

	_initStateButtons() {
		const saveButton = this.container.querySelector('.save-state-button');

		saveButton.addEventListener('click', (e) => {
			const label = prompt('Name') || undefined;
			const outputState = {};

			this.groups.forEach((gr) => {
				const groupState = gr.state;

				groupState.label = gr.label;
				outputState[gr.label] = groupState;
			});
			this.stateManager.setState(outputState, label);
			this.stateManager.saveState(label);

			this._initSavedStatesButtons();
		});

		this._initSavedStatesButtons();
	}

	_initSavedStatesButtons() {
		const states = this.stateManager.states;
		const buttonsContainer = this.container.querySelector('.state-buttons');

		buttonsContainer.innerHTML = '';

		states.forEach((state) => {
			const button = document.createElement('div');

			button.classList.add('button');
			button.innerHTML = buttonTemplate({ label: state });

			button.addEventListener('click', (e) => {
				const savedState = this.stateManager.getSavedState(state);

				this._clearGroups();
				for (const groupState in savedState) {
					this._addGroup(new this.inputGroups[groupState](savedState[groupState]));
				}
				console.log(savedState);
				this.emitGroupsState();
			});

			buttonsContainer.appendChild(button);
		});
	}

	_initDropdown() {
		this.container.querySelector('.effect-add-button').addEventListener('click', (e) => {
			e.stopPropagation();
			if (!this.dropdownBox) {
				// requestAnimationFrame(() => e.target.querySelector('span').textContent = '- Behaviors');
				const dropdownBox = new DropdownBox(this);

				this.container.appendChild(dropdownBox.container);
				this.dropdownBox = dropdownBox;
				this.dropdownBox.on(DropdownBox.events.ADD, (group) => {
					const content = this.container.querySelector('.content-component');

					content.scrollTop = content.scrollHeight;
					this._addGroup(group);
					this.emitGroupsState();
				});

				this.dropdownBox.on(DropdownBox.events.REMOVE, (group) => {
					this._removeGroup(group);
					this.emitGroupsState();
				});

				document.body.addEventListener('click', this.hideDropdown);
			} else {
				this.hideDropdown();
			}
		});
	}

	hideDropdown() {
		// requestAnimationFrame(() => e.target.querySelector('span').textContent = '+ Behaviors');
		if (this.dropdownBox) {
			this.container.removeChild(this.dropdownBox.container);
			this.dropdownBox = null;
			document.body.removeEventListener('click', this.hideDropdown);
		}
	}
}

module.exports = EffetcsBox;
