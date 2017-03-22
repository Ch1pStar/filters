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
			'../img/particles/p1.png',
			'../img/particles/p2.png',
			'../img/particles/p3.png',
			'../img/particles/p4.png',
		],
		backgrounds: [
			'../img/backgrounds/bg.png',
		],
	};

    /**
     * @param {Object} fl Flash API
     * @param {Object} options Panel config options
     */
	constructor(fl, options = {}) {
		super(options, panelTemplate);

		console.log(this.assets);

		this.container.className = 'app-component-container';
		this.render();

		this._effectsPanel = new EffectsBox();
		this._effectsPanel.render();
		this._effectsPanel.on(EffectsBox.events.CHANGE, (prop) => this._previewPanel.effects = prop);

		this._imagesPanel = new ImagesBox();
		this._imagesPanel.render();

		if (window.__adobe_cep__) {
			this._getDocumentImages();
			this._subscribeDocumentEvents();
		} else {
			this._imagesPanel.particleTexturesBox.images = this.assets.particles;
		}
		this._imagesPanel.backgroundsBox.images = this.assets.backgrounds;

		this._previewPanel = new PreviewBox(this._effectsPanel, this._imagesPanel);
		this._previewPanel.render();

		this._toolsLinePanel = new ToolsLineBox(this._previewPanel, this._imagesPanel);
		this._toolsLinePanel.render();

		this._imagesPanel.particleTexturesBox.on(ParticleTexturesBox.events.CHANGE, (images) => {
			this._effectsPanel.emitGroupsState();
			this._previewPanel.particleImages = images;
		});

		this._imagesPanel.backgroundsBox.on(BackgroundsBox.events.CHANGE, (images) => this._previewPanel.backgroundImage = images[0]);

		this.container.querySelector('.app-component .inner .left').appendChild(this._previewPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._effectsPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._imagesPanel.container);
		this.container.querySelector('.app-component').appendChild(this._toolsLinePanel.container);
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

			this._imagesPanel.particleTexturesBox.images = imgs;
			this._imagesPanel.backgroundsBox.images = imgs;
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
