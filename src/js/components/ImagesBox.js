const Box = require('./Box');
const template = require('../../templates/Images.hbs');
const Grid = require('./Grid');

class ImagesBox extends Box{

	constructor(options){
		super(options, template)

		this.container.classList.add('images-component-container');
		this.render();

		const grid = new Grid({ columns: 5, items: 2, type: Grid.types.COLUMN });
		grid.render();
		requestAnimationFrame(()=>{
			this.container.querySelector('.content.container-grid').appendChild(grid.container);
		});
	}
}

module.exports = ImagesBox;