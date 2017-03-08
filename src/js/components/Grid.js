const template = require('../../templates/components/Grid.hbs');
const EventEmitter = require('eventemitter4');

/**
 * A grid component class
 * @class
 */
class Grid extends EventEmitter {

	/**
	* Possible grid types
	* @type {Object}
	*/
	static types = {
		NORMAL: 'normal',
		COLUMN: 'column',
	};

	/** @type {HTMLElement} Grid content wrapper */
	container = null;

	/** @type {Array} Array containing the grid columns */
	grid = [];

	/**
	* The grid config options
	* @type {Object}
	* @private
	*/
	_options = {
		columns: 4,
		items: 3,
		type: Grid.types.NORMAL,
		unselect: false,
		selectable: true,
	};

	/**
	 * @param  {Object} options The grid config options
	 */
	constructor(options) {
		super();
		Object.assign(this._options, options);

		this.container = document.createElement('div');
		this.container.className = 'grid-component-container';
		this.template = template;
	}

	/**
	* Html render logic
	*/
	render() {
		this.grid = [];

		for (let i = 0; i < this._options.columns; i++) {
			const column = [];

			this.grid.push(column);

			for (let j = 0; j < this._options.items; j++) {
				column.push({});
			}
		}

		this.container.innerHTML = this.template({
			grid: this.grid,
			type: this._options.type,
			items: this._options.items,
			columns: this._options.columns,
			isNormal: this._options.type === Grid.types.NORMAL,
		});

		const items = this.container.querySelectorAll('.item');

		[...items].forEach((item) => {
			item.addEventListener('click', () => {
				if (!this._options.selectable) return;
				if (this._options.unselect) this._unselect();
				item.classList.toggle('active');
			});
		});

		this._handleSettings();
	}

	/**
	* Unselects the grid items
	* @private
	*/
	_unselect() {
		const items = this.container.querySelectorAll('.item');

		[...items].forEach((item) => {
			item.classList.remove('active');
		});
	}

	/**
	* Grid settings handler
	* @private
	*/
	_handleSettings() {
		const columnsSetting = this.container.querySelector('.columns');
		const itemsSetting = this.container.querySelector('.items');

		columnsSetting.addEventListener('keyup', () => {
			this._options.columns = columnsSetting.value;
			this.render();
		});
		columnsSetting.addEventListener('focus', () => {
			columnsSetting.select();
		});

		itemsSetting.addEventListener('keyup', () => {
			this._options.items = itemsSetting.value;
			this.render();
		});
		itemsSetting.addEventListener('focus', () => {
			itemsSetting.select();
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
