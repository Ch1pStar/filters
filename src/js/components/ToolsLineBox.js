const Box = require('./Box');
const template = require('../../templates/ToolsLine.hbs');
const jsflUtil = require('../../jsfl/util');

class ToolsLineBox extends Box {

	/** @type {Object} List of events this class will dispatch */
	static events = {
		CLICK: 'tools_click',
	};

	constructor(previewPanel) {
	super({}, template);

	this.previewPanel = previewPanel;
	this.container.classList.add('tools-line-container');
	window.jsfl = jsflUtil;
		requestAnimationFrame(()=>{
			this.render();
			this._attachAddButton();
		});
	}

	_attachAddButton(){
	this.container.querySelector('.button.add').addEventListener('click', ()=>{

		window.__adobe_cep__.evalScript(jsflUtil.createEmitter(1, 2,
			`"${this.previewPanel.emitterState.actionScriptState.split('\r\n').join('\\r\\n')}"`), (a)=>{
				console.log(a);
			});

		});
	}
}

module.exports = ToolsLineBox;
