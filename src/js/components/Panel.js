const Group = require('./groups/abstract/Group');
const InputGroup = require('./groups/InputGroup');
const Grid = require('./Grid');
const PreviewBox = require('./PreviewBox');
const ImagesBox = require('./ImagesBox');
const EffectsBox = require('./EffectsBox');
const Box = require('./Box');
const panelTemplate = require('../../templates/Panel.hbs');

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

	/** @type {String} Image assets path */
	assetsPath = '../img/particles/';

	assets = [
		'p1.png',
		'p2.png',
		'p3.png',
		'p4.png',
	];

    /**
     * @param {Object} fl Flash API
     * @param {Object} options Panel config options
     */
	constructor(fl, options = {}) {
		super(options, panelTemplate);

		if (window.__adobe_cep__) {
			// get library images
		}

		this.container.className = 'app-component-container';
		this.render();

		this._effectsPanel = new EffectsBox();
		this._effectsPanel.render();
		this._effectsPanel.on(EffectsBox.events.CHANGE, (prop) => this._previewPanel.effects = prop);

		this._imagesPanel = new ImagesBox({ path: this.assetsPath, images: this.assets });
		this._imagesPanel.render();

		this._previewPanel = new PreviewBox(this._effectsPanel, this._imagesPanel);
		this._previewPanel.render();

		this._imagesPanel.on(ImagesBox.events.CHANGE, (images) => {
			this._effectsPanel.emitGroupsState();
			this._previewPanel.particleImages = images;
		});

		this.container.querySelector('.app-component .inner .left').appendChild(this._previewPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._effectsPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._imagesPanel.container);
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

}

module.exports = Panel;
