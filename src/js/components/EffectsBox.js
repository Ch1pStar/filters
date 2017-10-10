const Box = require('./Box');
const DropdownBox = require('./DropdownBox');
const ControlKit = require('controlkit');
const InputGroup = require('./groups/InputGroup');
const RateGroup = require('./groups/RateGroup');
const VelocityGroup = require('./groups/VelocityGroup');
const LifeGroup = require('./groups/LifeGroup');
const RadiusGroup = require('./groups/RadiusGroup');
const GravityGroup = require('./groups/GravityGroup');
const AttractionGroup = require('./groups/AttractionGroup');
const BlendModeGroup = require('./groups/BlendModeGroup');
const template = require('../../templates/EffectsBox.hbs');

const DopeGroup = require('./groups/abstract/DopeGroup');

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

	properties = {};

	constructor(options) {
		super(options, template);

		this.container.classList.add('behaviours-component-container');
		this.render();
	}

	onRendered() {
		this.contentContainer = this.container.querySelector('.content .content-component');

		this._initGroups();

		this.hideDropdown = this.hideDropdown.bind(this);
	}

	_initGroups() {
		// default groups
		// const lifeGroup = new LifeGroup(this);
		// const rateGroup = new RateGroup(this);
		// const radiusGroup = new RadiusGroup(this);
		// const velGroup = new VelocityGroup(this);
		// const gravityGroup = new GravityGroup(this);
		// const attractionGroup = new AttractionGroup(this);
		// const blendModeGroup = new BlendModeGroup(this);

		// emit groups state function
		const emitGroupsState = this.emitGroupsState.bind(this);

		const dg = new DopeGroup(this);

		this.contentContainer.appendChild(dg.container);

		window.a = dg;

		this.groups = [
			dg,
			// lifeGroup,
			// rateGroup,
			// gravityGroup,
			// radiusGroup,
			// velGroup,
			// attractionGroup,
			// blendModeGroup,
		];

		this.groups.forEach((group) => {
			group.on(DopeGroup.events.INPUT, emitGroupsState);

		});
		// this._initDropdown();
	}

	emitGroupsState() {
		const output = {};

		this.groups.forEach((gr) => output[gr.label] = gr.fields);
		this.emit(EffetcsBox.events.CHANGE, output);
	}

	_initDropdown() {
		// add event listener after the button is rendered
		requestAnimationFrame(() => {
			this.container.querySelector('.effect-add-button').addEventListener('click', (e) => {
				e.stopPropagation();
				if (!this.dropdownBox) {
					// requestAnimationFrame(() => e.target.querySelector('span').textContent = '- Behaviors');
					const dropdownBox = new DropdownBox(this);

					this.container.appendChild(dropdownBox.container);
					this.dropdownBox = dropdownBox;
					this.dropdownBox.on(DropdownBox.events.ADD, (group) => {
						const content = this.container.querySelector('.content-component');

						group.panel = this._panel;
						group.group.enable();
						this.groups.push(group);

						content.scrollTop = content.scrollHeight;
						this.emitGroupsState();
					});

					this.dropdownBox.on(DropdownBox.events.REMOVE, (group) => {
						// remove the group from control kit
						this._panel._node._element.querySelector('.group-list').removeChild(group.group._node._element);
						this._panel._groups.splice(this._panel._groups.indexOf(group.group), 1);
						this.groups.splice(this.groups.indexOf(group), 1);
						this.emitGroupsState();
					});

					document.body.addEventListener('click', this.hideDropdown);
				} else {
					this.hideDropdown();
				}
			});
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
