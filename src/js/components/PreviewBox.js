const Box = require('./Box');
const template = require('../../templates/Preview.hbs');



class PreviewBox extends Box{


	constructor(options){
		super(options, template)

		this.container.classList.add('preview-component-container');

		this.render();
	}
}

module.exports = PreviewBox;