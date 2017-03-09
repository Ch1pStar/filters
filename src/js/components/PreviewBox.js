const Box = require('./Box');
const template = require('../../templates/Preview.hbs');
const PIXI = require('pixi.js');

const Proton = require('dopamine-proton');

class PreviewBox extends Box {

	emitter = null;

	protonProperties = {
		Life: [1],
		Radius: [5],
		Velocity: [2, Proton.getSpan(0, 360), 'polar'],
		Rate: [150, 0.01],
		Gravity: [8],
		Alpha: [1, 0, Infinity, Proton.easeOutCubic],
	};

	constructor(effectsPanel, imagesPanel) {
		super({}, template);

		this.container.classList.add('preview-component-container');

		requestAnimationFrame(() => {
			this.render();
			this._initCanvasRenderer();
		});
	}

	set effects(effects) {
		this._createEmitter();
	}

	set particleImage(image) {
		this._particleImage = image;
		this.particleTexture = new PIXI.Texture(new PIXI.BaseTexture(image));

		this._createEmitter();
	}

	get particleImage() {
		return this._particleImage;
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

		// this._createEmitter();
		this._startRender();
	}

	_createEmitter() {
		if (this.cnt) {
			this.stage.removeChild(this.cnt);
		}
		this.cnt = new PIXI.particles.ParticleContainer(30000, {
			scale: false,
			position: true,
			rotation: false,
			uvs: false,
			alpha: Boolean(this.protonProperties.Alpha),
		});
		const emitter = new Proton.Emitter();
		const rateProp = this.protonProperties.Rate;
		const radiusProp = this.protonProperties.Radius;
		const lifeProp = this.protonProperties.Life;
		const velProp = this.protonProperties.Velocity;
		const gravityProp = this.protonProperties.Gravity;
		const alphaProp = this.protonProperties.Alpha;

		this.stage.addChild(this.cnt);

		emitter.integrator = new Proton.NumericalIntegration(Proton.EULER);
		emitter.pool = new Proton.Pool();

		if (rateProp) emitter.rate = new Proton.Rate(...rateProp);
		if (radiusProp) emitter.addInitialize(new Proton.Radius(...radiusProp));
		if (lifeProp) emitter.addInitialize(new Proton.Life(...lifeProp));
		if (velProp) emitter.addInitialize(new Proton.Velocity(...velProp));
		if (gravityProp) emitter.addBehaviour(new Proton.Gravity(...gravityProp));
		if (alphaProp) emitter.addBehaviour(new Proton.Alpha(...alphaProp));

		emitter.p.x = Math.random() * (this.previewWidth - 200) + 100;
		// emitter.p.y = (Math.random()* (this.previewHeight/2) + 200) - 100;
		emitter.p.y = 100;
		emitter.emit();

		emitter.addEventListener(Proton.PARTICLE_CREATED, (particle) => {
			if (particle.sprite) {
				particle.sprite.renderable = true;
			} else {
				const sp = new PIXI.Sprite(this.particleTexture);

				sp.width = 15;
				sp.height = 15;
				this.cnt.addChild(sp);
				particle.sprite = sp;
			}
		});
		emitter.addEventListener(Proton.PARTICLE_UPDATE, (particle) => {
			const sp = particle.sprite;

			sp.position.x = particle.p.x;
			sp.position.y = particle.p.y;
			if (this.protonProperties.Alpha) sp.alpha = particle.alpha;
		});
		emitter.addEventListener(Proton.PARTICLE_DEAD, (particle) => {
			// this.cnt.removeChild(particle.sprite);
			particle.sprite.renderable = false;
		});
		this.emitter = emitter;
	}

	_startRender() {
		const draw = () => {
			requestAnimationFrame(draw);
			if (this.emitter) {
				this.emitter.update(0.0167);
				this.particleCounter.text = this.emitter.particles.length;
			}
			this.renderer.render(this.stage);
		};

		draw();
	}
}

module.exports = PreviewBox;
