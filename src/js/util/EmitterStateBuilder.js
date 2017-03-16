const headTemplate = require('../../templates/components/emitter/head.hbs');
const footerTemplate = require('../../templates/components/emitter/footer.hbs');

class EmitterStateBuilder{

	emitterTemplate = {
		head: headTemplate(),
		body: ``,
		footer: footerTemplate(),
	};

	constructor(){

	}

	set effects(val){
		this.emitterTemplate.body = val;
	}

	get previewState(){
		return this.emitterTemplate.head + this.emitterTemplate.body + this.emitterTemplate.footer;
	}

}

module.exports = EmitterStateBuilder;
