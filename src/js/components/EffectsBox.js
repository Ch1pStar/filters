const Box = require('./Box');
const DropdownBox = require('./DropdownBox');
const ControlKit = require('controlkit');
const InputGroup = require('./groups/InputGroup');
const RateGroup = require('./groups/RateGroup');
const VelocityGroup = require('./groups/VelocityGroup');
const LifeGroup = require('./groups/LifeGroup');
const RadiusGroup = require('./groups/RadiusGroup');
const GravityGroup = require('./groups/GravityGroup');
const MassGroup = require('./groups/MassGroup');
const template = require('../../templates/Effects.hbs');

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

		window.ck = ControlKit;

		this.container.classList.add('behaviours-component-container');
		this.render();

		this._controlKit = new ControlKit();
		this._panel = this._controlKit.addPanel();

		this._initGroups();

		requestAnimationFrame(() => {
			this.container.querySelector('.content .content-component').appendChild(this._controlKit._node._element);
		});
	}

	_initGroups() {
		const self = this;

		// default groups
		const lifeGroup = new LifeGroup(this);
		const rateGroup = new RateGroup(this);
		const radiusGroup = new RadiusGroup(this);
		const velGroup = new VelocityGroup(this);
		const gravityGroup = new GravityGroup(this);
		const massGroup = new MassGroup(this);

		this.groups = [lifeGroup, rateGroup, gravityGroup, radiusGroup, velGroup, massGroup];
		this.groups.forEach((group) => {
			group.panel = this._panel;
			group.on(InputGroup.events.CHANGE, this.emitGroupsState.bind(this));
		});

		this._initDropdown();
	}

	emitGroupsState() {
		let output = '';

		this.groups.forEach((gr) => {
			output += `${gr.value}\n`;
		});
		this.emit(EffetcsBox.events.CHANGE, output);
	}

	_initDropdown() {
		// add event listener after the button is rendered
		requestAnimationFrame(() => {
			this.container.querySelector('.effect-add-button').addEventListener('click', (e) => {
				if (!this.dropdownBox) {
					requestAnimationFrame(() => e.target.querySelector('span').textContent = '- Behaviors');

					const dropdownBox = new DropdownBox(this);

					this.container.appendChild(dropdownBox.container);
					this.dropdownBox = dropdownBox;
					this.dropdownBox.on(DropdownBox.events.ADD, (group) => {
						group.panel = this._panel;
						this.groups.push(group);
					});

					this.dropdownBox.on(DropdownBox.events.REMOVE, (group) => {
						// remove the group from control kit
						this._panel._node._element.querySelector('.group-list').removeChild(group.group._node._element);
						this._panel._groups.splice(this._panel._groups.indexOf(group.group), 1);
						this.groups.splice(this.groups.indexOf(group), 1);
					});
				} else {
					requestAnimationFrame(() => e.target.querySelector('span').textContent = '+ Behaviors');
					this.container.removeChild(this.dropdownBox.container);
					this.dropdownBox = null;
				}
			});
		});
	}
}

module.exports = EffetcsBox;
