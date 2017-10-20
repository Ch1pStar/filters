const Box = require('./Box');
const template = require('../../templates/PreviewBox.hbs');
const PIXI = require('pixi.js');
const SheetBuilder = require('../util/SpriteSheetBuilder');
const EmitterStateBuilder = require('../util/EmitterStateBuilder');
const Proton = require('Quark');
const Filters = require('pixi-filters');

class PreviewBox extends Box {
	emitter = null;
	renderer = null;

	constructor(effectsPanel) {
		super({}, template);

		this.container.classList.add('preview-component-container');

		this.emitterState = new EmitterStateBuilder();
		this.currentFrame = 0;
		this.running = true;
		this._startEmit = this._startEmit.bind(this);
		this._stopEmit = this._stopEmit.bind(this);
		this._updateCursorPosition = this._updateCursorPosition.bind(this);
		this.filters = [];

		requestAnimationFrame(() => {
			this.render();
			this._initCanvasRenderer();
			this._initEmitTypes();
		});
	}

	set effects(effects) {
		this.emitterState.effects = effects;
		this._createEmitter();
	}

	set particleImages(images) {
		const sheetBuilder = new SheetBuilder(this.renderer);

		this._particleImages = images;
		sheetBuilder.sources = images;
		this.particleTextures = sheetBuilder.buildSheet();
		this._createEmitter();
	}

	get particleImages() {
		return this._particleImages;
	}

	set backgroundImage(image) {
		const background = this.background;
		const bgSprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(image)));

		bgSprite.width = this.previewWidth;
		bgSprite.x = bgSprite.width > this.previewWidth ? 0 : (this.previewWidth - bgSprite.width) / 2;
		bgSprite.y = bgSprite.height > this.previewHeight ? 0 : (this.previewHeight - bgSprite.height) / 2;
		bgSprite.x = (this.previewWidth - bgSprite.width) / 2;
		bgSprite.y = (this.previewHeight - bgSprite.height) / 2;
		background.children.length = 0;
		background.addChild(bgSprite);
	}

	_initCanvasRenderer() {
		const view = (this.view = this.container.querySelector('.canvas'));
		const renderer = (this.renderer = PIXI.autoDetectRenderer(this.view.width, this.view.height, { view }));
		const stage = (this.stage = new PIXI.Container());
		const background = (this.background = new PIXI.Container());

		this.previewWidth = this.view.width;
		this.previewHeight = this.view.height;

		window.r = renderer;
		window.p = this;

		this.particleCounter = new PIXI.Text('0', { fill: 0xffffff, fontSize: 12 });
		this.particleCounter.y = this.previewHeight - this.particleCounter.height;
		stage.addChild(this.particleCounter);
		stage.addChild(background);
		this._startRender();
	}

	_createEmitter() {
		const emitterCode = this.emitterState.previewState;

		eval(emitterCode);
		// if (this.particleTextures && this.particleTextures.length) {

		// 	this.emitter = this.emitterZoneEmitter;
		// 	this.emitter.emit();
		// }
	}

	_startRender() {
		const draw = () => {
			requestAnimationFrame(draw);
			if (this.emitter && this.running) {
				this._updateEmitterPosition();
				// physics is not decoupled from rendering for this demo
				// so we use constant time step
				this.emitter.update(0.0167);
				this.particleCounter.text = this.emitter.activeCount;
			}
			this.renderer.render(this.stage);
			this.currentFrame++;
		};

		draw();
	}

	_initEmitTypes() {
		const checkboxes = this.container.querySelectorAll('.check');

		[...checkboxes].forEach(check => {
			check.addEventListener('click', () => {
				const type = check.dataset.type;

				[...checkboxes].forEach(check => (check.checked = false));
				check.checked = true;

				// reset
				this.emitOnClick = false;
				this._stopCursorFollow();

				if (type === 'tween') {
					this._updateEmitterPosition = this._tweenUpdate;
					this.emitter.p.x = 30;
					this.emitter.p.y = 30;
				} else if (type === 'follow') {
					this._updateEmitterPosition = this._cursorUpdate;
					this._startCursorFollow();
				} else {
					this._updateEmitterPosition = function() {};
					this.emitOnClick = true;
					this._stopEmit();
				}
			});
		});
	}

	_updateEmitterPosition() {}

	set emitOnClick(val) {
		this._emitOnClick = val;
		if (val) {
			this.container.addEventListener('mousedown', this._startEmit);
			this.container.addEventListener('mouseup', this._stopEmit);
		} else {
			this.container.removeEventListener('mousedown', this._startEmit);
			this.container.removeEventListener('mouseup', this._stopEmit);
		}
	}

	_startEmit() {
		this.emitter.emit();
		this._updateEmitterPosition = this._cursorUpdate;
		this._startCursorFollow();
	}

	_stopEmit() {
		this.emitter.stopEmit();
	}

	_tweenUpdate() {
		this.emitter.p.x = Math.sin(this.currentFrame * 0.04) * 450 + 620;
		this.emitter.p.y = Math.cos(this.currentFrame * 0.04) * 30 + 80;
	}

	_startCursorFollow() {
		this.container.addEventListener('mousemove', this._updateCursorPosition);
	}

	_updateCursorPosition(e) {
		this.cursorX = e.layerX;
		this.cursorY = e.layerY;
	}

	_stopCursorFollow() {
		this.container.removeEventListener('mousemove', this._updateCursorPosition);
	}

	_cursorUpdate() {
		const cursorX = this.cursorX || 100;
		const cursorY = this.cursorY || 100;

		if (cursorX < this.previewWidth) this.emitter.p.x = this.cursorX;
		if (cursorY < this.previewHeight) this.emitter.p.y = this.cursorY;
	}
}

module.exports = PreviewBox;
