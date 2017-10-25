const template = require('../../templates/components/Grid.hbs');
const EventEmitter = require('eventemitter3');
const Box = require('./Box');

/**
 * A grid component class
 * @class
 */
class Grid extends Box {
	/**
	 * @param  {Object} options The grid config options
	 */
	constructor(options = {}) {
		super(options, template);

		this.container.classList.add('grid-component-container');
	}

	/**
	* Unselects the grid items
	* @private
	*/
	_unselect() {
		const items = this.container.querySelectorAll('.img-box');

		[...items].forEach((item) => {
			item.classList.remove('active');
		});
	}

	/**
	* Selected items getter
	* @return {Array} Array of the currently selected items
	*/
	get selected() {
		const active = this.container.querySelectorAll('.active');
		const selected = [];

		[...active].forEach((item) => {
			const obj = {
				x: item.parentNode.getAttribute('data-column'),
				y: item.getAttribute('data-item'),
			};

			selected.push(obj);
		});

		return selected;
	}
}

module.exports = Grid;
