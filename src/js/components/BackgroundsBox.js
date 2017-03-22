const Box = require('./Box');
const template = require('../../templates/Backgrounds.hbs');
const Grid = require('./Grid');

class BackgroundsBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		CHANGE: 'background_change',
	};

	constructor(options) {
		super(options, template);

		this.container.classList.add('backgrounds-component-container');
		this.render();

		const grid = this.grid = new Grid();

		grid.render();
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				this.container.querySelector('.content.container-grid').appendChild(grid.container);
			});
		});
	}

	set images(images) {
		this._initGridImages(images);
	}

	_initGridImages(imgs) {
		this.grid.clearContent('.grid-component');
		[...imgs].forEach((img) => this._createImageItem(img));
	}

	_createImageItem(imagePath) {
		const imageElement = new Image();

		imageElement.src = imagePath;
		const imageWrapper = document.createElement('div');

		imageWrapper.className = 'img-box';
		imageWrapper.appendChild(imageElement);
		this.grid.container.querySelector('.grid-component').appendChild(imageWrapper);
		imageWrapper.addEventListener('click', () => {
			this.grid._unselect();
			imageWrapper.classList.toggle('active');
			this.emit(BackgroundsBox.events.CHANGE, this.container.querySelectorAll('.active img'));
		});
	}
}

module.exports = BackgroundsBox;
