const InputRange = require('dope-components').InputRange;
const EventEmitter = require('eventemitter4');

class DopeGroup extends EventEmitter{

	static events = {
		// ...InputRange.events,
		ADD: 'add',
		CHANGE: 'change',
	};

	container = null;

	/**
	 * @param {Panel} panel The panel this component is attatched to
	 * @param {string} label The group label
	 * @param {Boolean} enable Whether the group is enabled
	 */
	constructor(label, options = {}) {
		super();

		this.label = label;
		this.options = options;

		this.container = document.createElement('div');
		this.container.className = 'input-group-component-container';

		const input = this.input = new InputRange();

		this.inputs = [input];

		this._initInput();
	}

	setState() {
		this.input.setState({label: this.label, ...this.options});
	}

	_initInput() {
		const cnt = this.container;
		const inputs = this.inputs;

		inputs.forEach((input) => {
			input.on(InputRange.events.INPUT, (e) => {
				this.emit(DopeGroup.events.CHANGE, e);		
			});

			cnt.appendChild(input.container);
		});

		this.setState();
	}

	get fields() {
		return { [this.label]: this.input.state.value};
	}

	get command() {

	}

	get state() {
		return this.input.state;
	}
}

module.exports = DopeGroup;