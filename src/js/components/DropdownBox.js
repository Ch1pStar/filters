const Box = require('./Box');
const ControlKit = require('controlkit');
const InputGroup = require('./groups/InputGroup');
const template = require('../../templates/components/BehavioursDropdown.hbs');

class DropdownBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		ADD: 'effect_add',
		REMOVE: 'dropwdown_effect_remove',
	};

	constructor() {
		super({}, template);

		this.container.classList.add('dropdown-component-container');
		this.render();

		this.initEffectOptions();
		this.groups = new Map();
	}

	initEffectOptions() {
		requestAnimationFrame(() => {
			const items = Array.prototype.slice.call(this.container.querySelectorAll('li'));

			items.forEach((option) => {
				option.addEventListener('click', (e) => {
					const effectType = e.target.dataset.effectType;

					if (this.groups.has(effectType)) {
						this.emit(DropdownBox.events.REMOVE, this.groups.get(effectType));
						this.groups.delete(effectType);
					} else {
						const group = new InputGroup(effectType);

						this.emit(DropdownBox.events.ADD, group);
						this.groups.set(effectType, group);
					}
				});
			});
		});
	}
}

module.exports = DropdownBox;
