const Box = require('./Box');
const ParticleTexturesBox = require('./ParticleTexturesBox');
const BackgroundsBox = require('./BackgroundsBox');
const template = require('../../templates/ImagesBox.hbs');
const Grid = require('./Grid');

class ImagesBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		CHANGE: 'image_change',
	};

	constructor(options) {
		super(options, template);
		this.container.classList.add('images-component-container');
		this.render();

		this.particleTexturesBox = new ParticleTexturesBox(options);
		this.backgroundsBox = new BackgroundsBox(options);

		requestAnimationFrame(() => {
			this.render();
			this.particleTexturesBox.render();
			this.backgroundsBox.render();

			this.container.appendChild(this.particleTexturesBox.container);
			this.container.appendChild(this.backgroundsBox.container);
		});
	}
}

module.exports = ImagesBox;
