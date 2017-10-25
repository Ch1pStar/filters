const InputRange = require('dope-components').InputRange;
const Folder = require('dope-components').Folder;
const Component = require('dope-components').Component;
const PreviewBox = require('../../PreviewBox');

class Group extends Folder {
	static events = {
		// ...InputRange.events,
		ADD: 'add',
		CHANGE: 'change',
		REMOVE: 'remove'
	};

	/**
	 * @param {Panel} panel The panel this component is attatched to
	 * @param {string} label The group label
	 * @param {Boolean} enable Whether the group is enabled
	 */
	constructor(options = {}) {
		super(options);

		this.options = options;
		this.label = options.label;
		this.setState({ ...this.options });
		this.setState({ title: this.label });
		this.removeBtn = document.createElement('span');
		this.removeBtn.classList.add('fa-times', 'remove');
		this.removeBtn.addEventListener('click', this._handleRemoveClicked.bind(this));
		this.folderElem = this.container.querySelector('.folder');
		this.folderElem.appendChild(this.removeBtn);
		this._initInput();
	}

	_handleRemoveClicked(e, element) {
		this.container.removeChild(this.container.querySelector('.folder-component'));
		this.emit(Group.events.REMOVE, this.label);
	}

	onUpdate() {
		this.attach('click', '.title', this._handleClick.bind(this));
	}

	_initInput() {
		const cnt = this.getContainer();
		const inputs = this.inputs;
		inputs.forEach(input => {
			input.on(Component.events.UPDATE_STATE, e => {
				this.emit(Group.events.CHANGE, e);
			});
			cnt.appendChild(input.container);
		});
	}

	get fields() {
		return { [this.label]: this.input.state.value };
	}

	get command() {}
}

module.exports = Group;
