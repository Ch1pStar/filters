const EventEmitter = require('eventemitter4');

/**
 * The base class for a component
 * @class
 * @abstract
 */
class Group extends EventEmitter {

    /** @type {Object} List of events this class will dispatch */
	static events = {
		ADD: 'add',
	};

    /** @type {Object} The controlkit group object */
	group = null;

	/**
	 * @type {HTMLElement} Html wrapper element
	 */
	wrap = null;

	/**
	 * @type {string} The group label
	 */
	label = '';

	/**
	 * {Panel} _panel The panel this component is attatched to
	 * @private
	 */
	_panel = null;

	output = '';

	/**
	 * @param {Panel} panel The panel this component is attatched to
	 * @param {string} label The group label
	 * @param {Boolean} enable Whether the group is enabled
	 */
	constructor(label, enable = false) {
		super();

		this.label = label;

		this.enable = enable;

		requestAnimationFrame(() => {
			this.rendered();
		});
	}

	set panel(panel) {
		this._panel = panel.addGroup({ label: this.label, enable: this.enable });

		// Get last index... a big hacky
		this.group = this._panel._groups[this._panel._groups.length - 1];
	}

	/**
	* Called when the component html content has been rendered
	*/
	rendered() {
		// Get the wrapper of the group... this one is also a big hacky
		this.wrap = this.group._wrapNode._element.querySelector('.sub-group .wrap ul');
	}

	/**
	 * Adds an 'Add' button
	 * used to add the command to the flash timeline
	 */
	addAddButton() { // addAddAdd
		this._panel.addButton('Add', () => this.add());
	}

	/**
	 * Emits an 'ADD' event for the current command
	 */
	add() {
		this.emit(Group.events.ADD, { command: this.output });
		// this.group.disable();
	}

	/**
	 * Calls the group's event handler for the
	 * specified event
	 * event handler name should be 'on<event name>'
	 *
	 * Example: The handler for the 'documentChanged' event
	 * will be 'ondocumentChanged'
	 */
	/* eslint-disable */
	stateUpdate(event) {
		const handler = `on${event.type}`;
		if(handler in this){
			// call the event handler if it exists
			this[handler](event.data);
		}
	}
	/* eslint-enable */

    /**
     * Command label getter
     * @return {String} Returns the command string that will be added as a label
     */
    /* eslint-disable */
    get command() {}
    /* eslint-enable */
}

module.exports = Group;
