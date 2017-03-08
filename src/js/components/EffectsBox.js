const Box = require('./Box');
const template = require('../../templates/Effects.hbs');
const ControlKit = require('controlkit');
const InputGroup = require('./groups/InputGroup');

class EffetcsBox extends Box{

	/**
	 * @type {ControlKit}
	 * @private
	 */
	_controlKit = null;

	constructor(options){
		super(options, template)

		this.container.classList.add('behaviours-component-container');
		this.render();

		this._controlKit = new ControlKit();
		this._panel = this._controlKit.addPanel({ width: 250, fixed: false });
		
		const lifeGroup = new InputGroup('life');
		const rateGroup = new InputGroup('rate');
		const massGroup = new InputGroup('mass');
		const radiusGroup = new InputGroup('radius');

		this.groups = [lifeGroup, rateGroup, massGroup, radiusGroup];
		this.groups.forEach((group) => {
			group.panel = this._panel;
		});

		requestAnimationFrame(()=>{
			this.container.querySelector('.content .content-component').appendChild(this._controlKit._node._element);
		});
	}
}

module.exports = EffetcsBox;