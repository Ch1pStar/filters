const Group = require('./groups/abstract/Group');
const InputGroup = require('./groups/InputGroup');
const Grid = require('./Grid');
const PreviewBox = require('./PreviewBox');
const ImagesBox = require('./ImagesBox');
const ParticleTexturesBox = require('./ParticleTexturesBox');
const BackgroundsBox = require('./BackgroundsBox');
const EffectsBox = require('./EffectsBox');
const ToolsLineBox = require('./ToolsLineBox');
const Box = require('./Box');
const panelTemplate = require('../../templates/Panel.hbs');
const jsflUtil = require('../../jsfl/util');

/**
 * Preset commands panel
 * @class
 */
class Panel extends Box {

    /**
     * @type {Object} Flash API
     * @private
     */
	_fl = null;

	/**
	 * @type {Object}
	 * @private
	 */
	_effectsPanel = null;

	assets = {
		particles: [
			// '../img/particles/p1.png',
			// '../img/particles/p2.png',
			// '../img/particles/p3.png',
			// '../img/particles/p4.png',
			// '../img/particles/chip-3.png',
			'../img/basepixi-assets/1.png',
			'../img/basepixi-assets/2.png',
			'../img/basepixi-assets/3.png',
			'../img/basepixi-assets/4.png',
			'../img/basepixi-assets/5.png',
			'../img/basepixi-assets/6.png',
			'../img/basepixi-assets/7.png',
			'../img/basepixi-assets/8.png',
			'../img/basepixi-assets/9.png',
			'../img/basepixi-assets/10.png',
			'../img/basepixi-assets/11.png',
			'../img/basepixi-assets/12.png',
			'../img/basepixi-assets/13.png',
			'../img/basepixi-assets/14.png',
			'../img/basepixi-assets/15.png',
			'../img/basepixi-assets/16.png',
			'../img/basepixi-assets/17.png',
			'../img/basepixi-assets/18.png',
			'../img/basepixi-assets/19.png',
			'../img/basepixi-assets/20.png',
			'../img/basepixi-assets/21.png',
			'../img/basepixi-assets/22.png',
			'../img/basepixi-assets/23.png',
			'../img/basepixi-assets/24.png',
			'../img/basepixi-assets/25.png',
			'../img/basepixi-assets/26.png',
			'../img/basepixi-assets/27.png',
			'../img/basepixi-assets/28.png',
			'../img/basepixi-assets/29.png',
			'../img/basepixi-assets/30.png',
			'../img/basepixi-assets/31.png',
			'../img/basepixi-assets/32.png',
			'../img/basepixi-assets/33.png',
			'../img/basepixi-assets/34.png',
			'../img/basepixi-assets/35.png',
			'../img/basepixi-assets/36.png',
		],
		backgrounds: [
			'../img/backgrounds/bg.png',
			'../img/particles/chip-3.png',
		],
	};

    /**
     * @param {Object} fl Flash API
     * @param {Object} options Panel config options
     */
	constructor(fl, options = {}) {
		super(options, panelTemplate);

		window.pn = this;

		this.container.className = 'app-component-container';
		this.render();

		this._effectsPanel = new EffectsBox();
		this._effectsPanel.render();
		this._effectsPanel.on(EffectsBox.events.CHANGE, (effects) => this._previewPanel.effects = effects);

		this.particleTexturesBox = new ParticleTexturesBox();
		this.particleTexturesBox.render();

		this.backgroundsBox = new BackgroundsBox();
		this.backgroundsBox.render();

		if (window.__adobe_cep__) {
			this._getDocumentImages();
			this._subscribeDocumentEvents();
		} else {
			this.particleTexturesBox.images = this.assets.particles;
		}
		this.backgroundsBox.images = this.assets.backgrounds;

		this._previewPanel = new PreviewBox(this._effectsPanel);
		this._previewPanel.render();

		this._toolsLinePanel = new ToolsLineBox(this._previewPanel, this.particleTexturesBox, this.backgroundsBox);
		this._toolsLinePanel.render();

		this.particleTexturesBox.on(ParticleTexturesBox.events.CHANGE, (images) => {
			this._effectsPanel.emitGroupsState();
			this._previewPanel.particleImages = images;
		});

		this.backgroundsBox.on(BackgroundsBox.events.CHANGE, (images) => this._previewPanel.backgroundImage = images[0]);

		this.container.querySelector('.app-component .inner .left').appendChild(this._previewPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._effectsPanel.container);
		this.container.querySelector('.app-component').appendChild(this._toolsLinePanel.container);


		const imagesContainer = this._imagesContainer =  document.createElement('div');

		imagesContainer.className = 'box-component-container images-component-container';
		imagesContainer.appendChild(this.particleTexturesBox.container);
		imagesContainer.appendChild(this.backgroundsBox.container);
		this.container.querySelector('.app-component .inner .right').appendChild(imagesContainer);
	}

	/*eslint-disable*/
	/**
	* Application DOM is not available in Html extension's engine
	* and Html DOM is not available in host application's engine.
	* @link https://github.com/Adobe-CEP/CEP-Resources/wiki/CEP-6-HTML-Extension-Cookbook-for-CC-2015#access-application-dom-from-html-extension
	* @param {String} script The script string that will be executed
	* @param {Function} callback Callback function after the script execution is done
	* @private
	*/
	_eval(script, callback) {
		window.__adobe_cep__.evalScript(script, callback);
	}
	/*eslint-enable*/

	_getDocumentImages() {
		const cep = window.__adobe_cep__;

		cep.evalScript(jsflUtil.getLibraryImages(), (res) => {
			const imgs = res === 'undefined' ? [] : res.split(',');

			this.particleTexturesBox.images = imgs;
			this.backgroundsBox.images = imgs;
		});
	}

	_subscribeDocumentEvents() {
		const cep = window.__adobe_cep__;

		cep.addEventListener('com.adobe.events.flash.documentChanged',
			this._getDocumentImages.bind(this));
		cep.addEventListener('com.adobe.events.flash.documentOpened',
			this._getDocumentImages.bind(this));
	}
}

module.exports = Panel;
