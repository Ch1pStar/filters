const Box = require('./Box');
const template = require('../../templates/ToolsLineBox.hbs');
const jsflUtil = require('../../jsfl/util');

class ToolsLineBox extends Box {
	/** @type {Object} List of events this class will dispatch */
	static events = {
		CLICK: 'tools_click'
	};

	constructor(previewPanel, particleTexturesBox) {
		super({}, template);

		this.previewPanel = previewPanel;
		this.particleTexturesBox = particleTexturesBox;
		this.container.classList.add('tools-line-container');
		window.jsfl = jsflUtil;

		this.inFlash = Boolean(window.__adobe_cep__);

		requestAnimationFrame(() => {
			this.render();
			this._attachAddButton();
			this._attachStopButton();
			this._attachStartButton();
			this._attachDestroyButton();
		});
	}

	_attachAddButton() {
		this.container.querySelector('.button.add').addEventListener('click', () => {
			// const images = [...this.particleTexturesBox.images];
			const imageNames = images.map(itm => itm.src.match(/(?=\w+\.\w{3,4}$).+/gi)[0]);
			const codeString = this.previewPanel.emitterState.actionScriptState;

			if (!this.inFlash) {
				console.log(codeString);
				// eval(codeString);
				return;
			}

			window.__adobe_cep__.evalScript(
				jsflUtil.createEmitter(JSON.stringify(imageNames), 2, this._prepareString(codeString)),
				a => {
					console.log(a);
				}
			);
		});
	}

	_attachStopButton() {
		this.container.querySelector('.button.stop').addEventListener('click', () => {
			const codeString = this.previewPanel.emitterState.emitterStopState;

			if (!this.inFlash) {
				console.log(codeString);

				return;
			}

			window.__adobe_cep__.evalScript(jsflUtil.insertScript(this._prepareString(codeString)), a => {
				console.log(a);
			});
		});
	}

	_attachStartButton() {
		this.container.querySelector('.button.start').addEventListener('click', () => {
			const codeString = this.previewPanel.emitterState.emitterStartState;

			if (!this.inFlash) {
				console.log(codeString);

				return;
			}

			window.__adobe_cep__.evalScript(jsflUtil.insertScript(this._prepareString(codeString)), a => {
				console.log(a);
			});
		});
	}

	_attachDestroyButton() {
		this.container.querySelector('.button.destroy').addEventListener('click', () => {
			const codeString = this.previewPanel.emitterState.emitterDestroyState;

			if (!this.inFlash) {
				console.log(codeString);

				return;
			}

			window.__adobe_cep__.evalScript(jsflUtil.insertScript(this._prepareString(codeString)), a => {
				console.log(a);
			});
		});
	}

	_prepareString(str) {
		return `"${str.split('\r\n').join('\\r\\n')}"`;
	}
}

module.exports = ToolsLineBox;
