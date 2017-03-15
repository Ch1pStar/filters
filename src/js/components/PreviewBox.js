const Box = require('./Box');
const template = require('../../templates/Preview.hbs');
const PIXI = require('pixi.js');
const SheetBuilder = require('../util/SpriteSheetBuilder');

// const Proton = require('dopamine-proton');
// const Proton = require('quark');

const Proton = Quark;

class PreviewBox extends Box {

	emitter = null;
	renderer = null;

	emitterTemplate = {
		head: `if (this.cnt) {
			this.stage.removeChild(this.cnt);
		}
		this.cnt = new PIXI.particles.ParticleContainer(30000, {
			scale: true,
			position: true,
			rotation: false,
			uvs: false,
			alpha: true,
		});

		this.stage.addChild(this.cnt);

		const emitter = new Proton.Emitter();
		emitter.maxParticles = 30000;`,
		body: ``,
		footer: `emitter.p.x = 100;
		// emitter.p.y = (Math.random()* (this.previewHeight/2) + 200) - 100;
		emitter.p.y = 100;
		emitter.emit();

		window.emitter = emitter;

		emitter.particleCreated.add((particle)=>{
			if(particle.sprite){
				particle.sprite.visible = true;
				particle.sprite.scale.set(particle.scale);
				return;
			}
			const txtId = Math.floor(Math.random()*(this.particleTextures.length));
			const texture = this.particleTextures[txtId];
			const sp = new PIXI.Sprite(texture);
			particle.sprite = sp;
			
			sp.width = 15;
			sp.height = 15;
			sp.anchor.set(0.5);
			this.cnt.addChild(sp);
		});

		emitter.particleUpdate.add((particle)=>{
			const sp = particle.sprite;
			sp.position.set(particle.p.x, particle.p.y);
			sp.alpha = particle.alpha;
			sp.scale.set(particle.scale);
			// sp.rotation = particle.rotation*Math.PI/180;
		});

		emitter.particleDead.add((particle) =>{
			// particle.sprite.visible = false;
			particle.sprite.alpha = 0;
			
			// cnt.removeChild(particle.sprite);
		});

		this.emitter = emitter;
		`,
	};

	constructor(effectsPanel, imagesPanel) {
		super({}, template);

		window.Proton = Proton;

		this.container.classList.add('preview-component-container');

		this.currentFrame = 0;
		this.running = true;
		this._startEmit = this._startEmit.bind(this);
		this._stopEmit = this._stopEmit.bind(this);
		this._updateCursorPosition = this._updateCursorPosition.bind(this);

		requestAnimationFrame(() => {
			this.render();
			this._initCanvasRenderer();
			this._initEmitTypes();
		});
	}

	set effects(effects) {
		// console.log(effects);
		this.emitterTemplate.body = effects;
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

	_initCanvasRenderer() {
		const view = this.view = this.container.querySelector('canvas');
		const renderer = this.renderer = PIXI.autoDetectRenderer(this.view.width, this.view.height, { view });
		const stage = this.stage = new PIXI.Container();

		this.previewWidth = this.view.width;
		this.previewHeight = this.view.height;

		window.r = renderer;
		window.p = this;

		this.particleCounter = new PIXI.Text('0', { fill: 0xffffff });
		this.particleCounter.y = this.previewHeight - this.particleCounter.height;
		stage.addChild(this.particleCounter);

		this._startRender();
	}

	_createEmitter() {
		const emitterCode = this.emitterTemplate.head + this.emitterTemplate.body + this.emitterTemplate.footer;

		if (this.particleTextures && this.particleTextures.length)			{ eval(emitterCode); }
	}

	_startRender() {
		const draw = () => {
			requestAnimationFrame(draw);
			if (this.emitter && this.running) {
				this._updateEmitterPosition();
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

		checkboxes.forEach((check) => {
			check.addEventListener('click', () => {
				const type = check.dataset.type;

				checkboxes.forEach((check) => check.checked = false);
				check.checked = true;

				// reset
				this.emitOnClick = false;
				this._stopCursorFollow();

				if (type === 'tween') {
					this._updateEmitterPosition = this._tweenUpdate;
					this.emitter.p.x = 100;
					this.emitter.p.y = 100;
				} else if (type === 'follow') {
					this._updateEmitterPosition = this._cursorUpdate;
					this._startCursorFollow();
				} else {
					this._updateEmitterPosition = function () {};
					this.emitOnClick = true;
					this._stopEmit();
				}
			});
		});
	}

	_updateEmitterPosition() {

	}

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
		this.emitter.p.x = Math.sin(this.currentFrame * 0.1) * 150 + 250;
		this.emitter.p.y = Math.cos(this.currentFrame * 0.1) * 30 + 150;
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
