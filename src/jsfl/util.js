function createEmitter(type, bounds, script){

	var dom = fl.getDocumentDOM()
	var timeline = dom.getTimeline();
	var currentFrame = timeline.currentFrame;
	var currentLayer = timeline.currentLayer;

		

	dom.library.deleteItem('emitterZone');

	dom.addNewRectangle({left:99, top:47, right:337, bottom:210}, 0);

	dom.setSelectionRect({left:99, top:47, right:337, bottom:210});

	var newSym = fl.getDocumentDOM().convertToSymbol('movie clip', 'emitterZone', 'top left');

	var instanceName = prompt('Instance name');

	if(instanceName){
		fl.getDocumentDOM().selection[0].name = instanceName;
		script = script.replace(/emitterZone/g, instanceName);
	}

	fl.trace(script);

	timeline.insertKeyframe(currentFrame);
	timeline.layers[currentLayer].frames[currentFrame].actionScript = script;

	return 1;
}

function insertScript(script){

	var dom = fl.getDocumentDOM()
	var timeline = dom.getTimeline();
	var currentFrame = timeline.currentFrame;
	var currentLayer = timeline.currentLayer;

	var instanceName = prompt('Instance name');

	if(instanceName){
		fl.getDocumentDOM().selection[0].name = instanceName;
		script = script.replace(/emitterZone/g, instanceName);
	}

	fl.trace(script);

	timeline.insertKeyframe(currentFrame);
	timeline.layers[currentLayer].frames[currentFrame].actionScript = script;
}

module.exports = new global.Proxy({
	createEmitter,
	insertScript,
}, {
	// when called, return the function as a string wrapped in a self-invoking function
	// with the supplied arguments
	get: (obj, prop) => {
		return new global.Proxy(obj[prop], {
			apply: (target, thisArg, argumentsList) => `(${target.toString()}(${[...argumentsList].join(',')}))`,
		});
	},
});