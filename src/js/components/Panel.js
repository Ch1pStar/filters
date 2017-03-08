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
class Panel extends Box{

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

    /**
     * @param {Object} fl Flash API
     * @param {Object} options Panel config options
     */
	constructor(fl, options = {}) {
		super(options, panelTemplate);
		this.container.className = 'app-component-container';
		this.render();

		this._previewPanel = new PreviewBox();
		this._previewPanel.render();

		this._effectsPanel = new EffectsBox();
		this._effectsPanel.render();

		this._imagesPanel = new ImagesBox();
		this._imagesPanel.render();


		this.container.querySelector('.app-component .inner .left').appendChild(this._previewPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._effectsPanel.container);
		this.container.querySelector('.app-component .inner .right').appendChild(this._imagesPanel.container);

		// const grid = new Grid({ columns: 5, items: 2, type: Grid.types.COLUMN });
		// grid.render();
		// requestAnimationFrame(()=>{
		// 	this._assetsPanel._wrapNode._element.insertBefore(grid.container, this._assetsPanel._wrapNode._element.firstChild);
		// });

		// const effectsOptions = {
		// 	actions: [
		// 		'Alpha',
		// 		'Attraction',
		// 		'Collision',
		// 		'Color',
		// 		'Crosszone'
		// 	],
		// 	selectedEffect: 'Alpha'
		// };

		// this._effectsPanel.addSelect(effectsOptions, 'actions', { target: 'selectedEffect', label: 'Add Effect' });
		// this._effectsPanel.addButton('+', () => {
		// 	const group = new InputGroup(effectsOptions.selectedEffect);
		// 	group.panel = this._effectsPanel;
		// 	this._groups.push(group);
		// });

		// const lifeGroup = new InputGroup('life');
		// const rateGroup = new InputGroup('rate');
		// const massGroup = new InputGroup('mass');
		// const radiusGroup = new InputGroup('radius');

		// this._groups = [lifeGroup, rateGroup, massGroup, radiusGroup];
		// this._groups.forEach((group) => {
		// 	group.panel = this._effectsPanel;
		// });

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