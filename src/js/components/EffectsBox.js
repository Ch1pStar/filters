const Box = require('./Box');
const DropdownBox = require('./DropdownBox');
const ControlKit = require('controlkit');
const InputGroup = require('./groups/InputGroup');
const template = require('../../templates/Effects.hbs');

class EffetcsBox extends Box {

	/**
	 * @type {ControlKit}
	 * @private
	 */
	_controlKit = null;

	constructor(options) {
		super(options, template);

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
		// default groups
		const lifeGroup = new InputGroup('Life');
		const rateGroup = new InputGroup('Rate', {
			amount: {
				get: () => 0,
				set: (val) => {
					console.log(val);
				},
			}, frequency: '0' }
		);
		const massGroup = new InputGroup('Mass');
		const radiusGroup = new InputGroup('Radius');
		const velGroup = new InputGroup('Velocity');

		this.groups = [lifeGroup, rateGroup, massGroup, radiusGroup, velGroup];
		this.groups.forEach((group) => group.panel = this._panel);

		this._initDropdown();
	}

	_initDropdown() {
		// add event listener after the button is rendered
		requestAnimationFrame(() => {
			this.container.querySelector('.effect-add-button').addEventListener('click', (e) => {
				if (!this.dropdownBox) {
					const dropdownBox = new DropdownBox(this._panel);

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
					this.container.removeChild(this.dropdownBox.container);
					this.dropdownBox = null;
				}
			});
		});
	}
}

module.exports = EffetcsBox;
