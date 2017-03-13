const Box = require('./Box');
const template = require('../../templates/Images.hbs');
const Grid = require('./Grid');

class ImagesBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		CHANGE: 'image_change',
	};

	constructor(options) {
		super(options, template);

		this.imagesPath = options.path;
		this.images = options.images;

		this.container.classList.add('images-component-container');
		this.render();

		const grid = this.grid = new Grid();

		grid.render();
		this._initGridImages();
		requestAnimationFrame(() => {
			this.container.querySelector('.content.container-grid').appendChild(grid.container);
		});
	}

	_initGridImages() {
		const imgs = this.images;

		imgs.forEach((img) => this._createImageItem(img));
	}

	_createImageItem(imagePath) {
		const imageElement = new Image();

		imageElement.src = this.imagesPath + imagePath;
		const imageWrapper = document.createElement('div');

		imageWrapper.className = 'img-box';
		imageWrapper.appendChild(imageElement);
		this.grid.container.querySelector('.grid-component').appendChild(imageWrapper);
		imageWrapper.addEventListener('click', () => {
			// this.grid._unselect();
			imageWrapper.classList.toggle('active');
			this.emit(ImagesBox.events.CHANGE, this.container.querySelectorAll('.active img'));
		});
	}
}

module.exports = ImagesBox;
