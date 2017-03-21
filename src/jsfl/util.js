/* eslint-disable */
function createEmitter(images, bounds, script) {
	var dom = fl.getDocumentDOM();
	var timeline = dom.getTimeline();
	var currentFrame = timeline.currentFrame;
	var currentLayer = timeline.currentLayer;

	dom.library.deleteItem('emitterZone');

	dom.addNewRectangle({ left: 99, top: 47, right: 337, bottom: 210 }, 0);

	dom.setSelectionRect({ left: 99, top: 47, right: 337, bottom: 210 });

	var newSym = fl.getDocumentDOM().convertToSymbol('movie clip', 'emitterZone', 'top left');

	var instanceName = prompt('Instance name');

	if (instanceName) {
		dom.selection[0].name = instanceName;
		script = script.replace(/emitterZone/g, instanceName);
	}

	dom.enterEditMode('inPlace');

	var items = dom.library.items;

	for (var i = 0; i < items.length; i++) {
		var item = items[i];

		if (item.sourceFilePath && (images.indexOf(item.name) > -1)) {
			dom.addItem({ x: 50, y: 50 }, item);
		}
	}

	timeline.insertKeyframe(currentFrame);
	timeline.layers[currentLayer].frames[currentFrame].actionScript = script;

	return 1;
}

function insertScript(script) {
	var dom = fl.getDocumentDOM();
	var timeline = dom.getTimeline();
	var currentFrame = timeline.currentFrame;
	var currentLayer = timeline.currentLayer;

	var instanceName = prompt('Instance name');

	if (instanceName && dom.selection[0]) {
		dom.selection[0].name = instanceName;
		script = script.replace(/emitterZone/g, instanceName);
	}

	timeline.insertKeyframe(currentFrame);
	timeline.layers[currentLayer].frames[currentFrame].actionScript = script;
}

function getLibraryImages() {
	var dom = fl.getDocumentDOM();
	var paths = [];
	var items = dom.library.items;

	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var path = item.sourceFilePath;

		if (path) paths.push(path);
	}

	return paths;
}

module.exports = new global.Proxy({
	createEmitter,
	insertScript,
	getLibraryImages,
}, {
	// when called, return the function as a string wrapped in a self-invoking function
	// with the supplied arguments
	get: (obj, prop) => new global.Proxy(obj[prop], {
		apply: (target, thisArg, argumentsList) => `(${target.toString()}(${[...argumentsList].join(',')}))`,
	}),
});
/* eslint-enable */
