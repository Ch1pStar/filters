const ControlKit = require('controlkit');

/**
 * Preset commands panel
 * @class
 */
class Panel {

	/**
	 * @type {ControlKit}
	 * @private
	 */
	_controlKit = null;

    /**
     * @type {Object} Flash API
     * @private
     */
	_fl = null;

    /**
     * @param {Object} fl Flash API
     * @param {Object} options Panel config options
     */
	constructor(fl, options = null) {
		this._controlKit = new ControlKit();
		this._fl = fl;
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
