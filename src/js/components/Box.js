const EventEmitter = require('eventemitter3');

/**
 * A box component class
 * @class
 */
class Box extends EventEmitter {
	/** @type {HTMLElement} Box content wrapper */
	container = null;

	_options = {};

	/**
	 * @param  {Object} options The box config options
	 */
	constructor(options = {}, template) {
		super();
		Object.assign(this._options, options);

		this.container = document.createElement('div');
		this.container.className = 'box-component-container';
		this.template = template;
	}

	/**
	* Html render logic
	*/
	render() {
		this.container.innerHTML = this.template();

		this.onRendered();
	}

	/**
	 * Called after the box content has been rendered
	 * @return {[type]} [description]
	 */
	onRendered() {}

	clearContent(selector) {
		const container = selector ? this.container.querySelector(selector) : this.container;

		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}
	}
}

module.exports = Box;
