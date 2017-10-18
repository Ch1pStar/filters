const Box = require('./Box');
const DropdownBox = require('./DropdownBox');

const template = require('../../templates/EffectsBox.hbs');
const buttonTemplate = require('../../templates/components/button.hbs');

const InputStateManager = require('./InputStateManager');
const DopeGroup = require('./groups/abstract/DopeGroup');

const GlowFilter = require('./groups/dope/filters/GlowFilter');
const DisplacementFilter = require('./groups/dope/filters/DisplacementFilter');
const BlurFilter = require('./groups/dope/filters/BlurFilter');
const NoiseFilter = require('./groups/dope/filters/NoiseFilter');
const ColorMatrixFilter = require('./groups/dope/filters/ColorMatrixFilter');
const OutlineFilter = require('./groups/dope/filters/OutlineFilter');
const DropShadowFilter = require('./groups/dope/filters/DropShadowFilter');
const TwistFilter = require('./groups/dope/filters/TwistFilter');
const AsciiFilter = require('./groups/dope/filters/AsciiFilter');
const DotFilter = require('./groups/dope/filters/DotFilter');
const EmbrossFilter = require('./groups/dope/filters/EmbrossFilter');
const PixelateFilter = require('./groups/dope/filters/PixelateFilter');
const RGBSplitFilter = require('./groups/dope/filters/RGBSplitFilter');
const CrossHatchFilter = require('./groups/dope/filters/CrossHatchFilter');
const ConvolutionFilter = require('./groups/dope/filters/ConvolutionFilter');
const BloomFilter = require('./groups/dope/filters/BloomFilter');
const TiltShiftFilter = require('./groups/dope/filters/TiltShiftFilter');
const ShockwaveFilter = require('./groups/dope/filters/ShockwaveFilter');
const BulgePinchFilter = require('./groups/dope/filters/BulgePinchFilter');
const ColorReplaceFilter = require('./groups/dope/filters/ColorReplaceFilter');

class EffetcsBox extends Box {
	/** @type {Object} List of events this class will dispatch */
	static events = {
		CHANGE: 'effect_change'
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
		EmbrossFilter,
		PixelateFilter,
		RGBSplitFilter,
		CrossHatchFilter,
		ConvolutionFilter,
		BloomFilter,
		TiltShiftFilter,
		ShockwaveFilter,
		BulgePinchFilter,
		ColorReplaceFilter
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

		this.groups.forEach(gr => {
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

		group.on(DopeGroup.events.CHANGE, this.emitGroupsState);
		this.groups.push(group);

		return group;
	}

	_removeGroup(group) {
		this.contentContainer.removeChild(group.container);

		group.removeAllListeners(DopeGroup.events.CHANGE);
		this.groups.splice(this.groups.indexOf(group), 1);

		return group;
	}

	_clearGroups() {
		const groups = this.groups;

		groups.forEach(gr => {
			this.contentContainer.removeChild(gr.container);
			gr.removeAllListeners(DopeGroup.events.CHANGE);
		});

		groups.length = 0;
	}

	_initStateButtons() {
		const saveButton = this.container.querySelector('.save-state-button');

		saveButton.addEventListener('click', e => {
			const label = prompt('Name') || undefined;
			const outputState = {};

			this.groups.forEach(gr => {
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

		states.forEach(state => {
			const button = document.createElement('div');

			button.classList.add('button');
			button.innerHTML = buttonTemplate({ label: state });

			button.addEventListener('click', e => {
				const savedState = this.stateManager.getSavedState(state);

				this._clearGroups();
				for (let groupState in savedState) {
					this._addGroup(new this.inputGroups[groupState](savedState[groupState]));
				}
				this.emitGroupsState();
			});

			buttonsContainer.appendChild(button);
		});
	}

	_initDropdown() {
		this.container.querySelector('.effect-add-button').addEventListener('click', e => {
			e.stopPropagation();
			if (!this.dropdownBox) {
				// requestAnimationFrame(() => e.target.querySelector('span').textContent = '- Behaviors');
				const dropdownBox = new DropdownBox(this);

				this.container.appendChild(dropdownBox.container);
				this.dropdownBox = dropdownBox;
				this.dropdownBox.on(DropdownBox.events.ADD, group => {
					const content = this.container.querySelector('.content-component');

					content.scrollTop = content.scrollHeight;
					this._addGroup(group);
					this.emitGroupsState();
				});

				this.dropdownBox.on(DropdownBox.events.REMOVE, group => {
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
