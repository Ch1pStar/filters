const PIXI = require('pixi.js');

// todo add scale, max sheet size(multiple sheets generated if sources exceed max size)
/**
 * @class Combines an array of image sources into a single PIXI.BaseTexture.
 * Creates a texture for each image source from the base texture
 */
class SpriteSheetBuilder{

	/** @type {PIXI.WebGLRenderer} The renderer used to render the sprite sheet */
	renderer = null;

	/** @type {Number} Sprite sheet width */
	sheetWidth = 0;

	/** @type {Number} Sprite sheet height */
	sheetHeight = 0;

	/** @type {PIXI.Texture[]} Image sources textures array */
	textures = [];

	/** @type {Img[]} Array of image sources */
	_sources = [];

	/** 
	 * @type {PIXI.Container} Pixi Container used to hold the source sprites for drawing 
	 * @private
	 */
	_sheetContainer = null;

	/**
	 * @type {PIXI.RenderTexture} Sprite sheet texture
	 * @private
	 */
	_sheetTexture = null;


	constructor(renderer) {
		this.renderer = renderer;
		this._sheetContainer = new PIXI.Container();		
	}

	/**
	 * Add aditional image sources
	 * @param {Image[]} image sources array
	 */
	addSources(images){
		this._sources.concat(images);
	}

	/**
	 * Set image sources
	 * @param  {Image[]} image sources array 
	 */
	set sources(images){
		this._sources = images;
	}

	/**
	 * Get the current image sources
	 * @return {Image[]} current image sources
	 */
	get sources(){
		return this._sources;
	}

	/**
	 * Builds the sprite sheet from the current image sources
	 * and returns an array of PIXI.Texture for each image
	 * @return {PIXI.Texture} A PIXI.Texture for each image
	 */
	buildSheet(){
		this.renderSheet();
		return this.createSourceTextures();
	}

	/**
	 * Renders a sprite sheet from the current image sources
	 */
	renderSheet() {
		const container = this._sheetContainer = new PIXI.Container();
		const sources = this._sources;
		let width = this.sheetWidth;
		let height = this.sheetHeight;

		[...sources].forEach((source)=>{
			const sourceSprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(source)));

			sourceSprite.x = width;
			container.addChild(sourceSprite);

			// save image actual size, since if the img element was resized
			// source.width and source.height are the resized values
			source.textureWidth = sourceSprite.width;
			source.textureHeight = sourceSprite.height;
			width += sourceSprite.width;
			// sheet height value is the largest single image height
			height = sourceSprite.height > height ? sourceSprite.height : height;
		});

		const sheetTexture = this._sheetTexture = PIXI.RenderTexture.create(width, height);

		// draw the images sheet
		this.renderer.render(container, sheetTexture);

	}

	/**
	 * Creates an array of PIXI.Texture for each image source
	 * @return {PIXI.Texture} A PIXI.Texture for each image
	 */
	createSourceTextures() {
		const textures = [];
		const sources = this._sources;
		const sheetTexture = this._sheetTexture;
		let startX = 0;

		[...sources].forEach((source) => {
			const txt = new PIXI.Texture(sheetTexture, new PIXI.Rectangle(startX, 0, source.textureWidth, source.textureHeight));

			textures.push(txt);
			startX += source.textureWidth;
		});

		return textures;
	}

}

module.exports = SpriteSheetBuilder;
