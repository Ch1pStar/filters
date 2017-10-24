const InputRange = require('dope-components').InputRange;
const EventEmitter = require('eventemitter4');
const Folder = require('dope-components').Folder;
const Component = require('dope-components').Component;

class Group extends Folder {
	static events = {
		// ...InputRange.events,
		ADD: 'add',
		CHANGE: 'change'
	};

	/**
	 * @param {Panel} panel The panel this component is attatched to
	 * @param {string} label The group label
	 * @param {Boolean} enable Whether the group is enabled
	 */
	constructor(options = {}) {
		super();

		this.options = options;
		this.label = options.label;

		// this.container = document.createElement('div');
		// this.container.className = 'folder-component-container input-group-component-container';

		const input = (this.input = new InputRange());
		this.input.setState({ ...this.options });
		this.inputs = [input];

		this._initInput();
	}

	// setState() {

	// }

	_initInput() {
		const cnt = this.getContainer();
		const inputs = this.inputs;

		inputs.forEach(input => {
			// Component.UPDATE_STATE
			// Component.events.UPDATE_STATE
			input.on(Component.events.UPDATE_STATE, e => {
				this.emit(Group.events.CHANGE, e);
			});

			cnt.appendChild(input.container);
		});

		this.setState();
	}

	get fields() {
		return { [this.label]: this.input.state.value };
	}

	get command() {}

	get state() {
		return this.input.state;
	}
}

module.exports = Group;
