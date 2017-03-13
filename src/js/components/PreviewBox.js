const Box = require('./Box');
const template = require('../../templates/Preview.hbs');
const PIXI = require('pixi.js');

// const Proton = require('dopamine-proton');
const Proton = require('quark');

class PreviewBox extends Box {

	emitter = null;
	renderer = null;

	emitterTemplate = {
		head: `if (this.cnt) {
			this.stage.removeChild(this.cnt);
		}
		this.cnt = new PIXI.particles.ParticleContainer(30000, {
			scale: false,
			position: true,
			rotation: false,
			uvs: false,
			alpha: false,
		});

		this.stage.addChild(this.cnt);

		const emitter = new Proton.Emitter();
		emitter.maxParticles = 15000;`,
		body: ``,
		footer: `emitter.p.x = 100;
		// emitter.p.y = (Math.random()* (this.previewHeight/2) + 200) - 100;
		emitter.p.y = 100;
		emitter.emit();

		window.emitter = emitter;

		emitter.particleCreated.add((particle)=>{
			if(particle.sprite){
				particle.sprite.visible = true;
				// sp.alpha = 1;
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
	      // sp.position.x = particle.p.x;
	      // sp.position.y = particle.p.y;
	    //   // sp.scale.x = particle.scale/2;
	    //   // sp.scale.y = particle.scale/2;
	    //   // sp.anchor.x = 0.5;
	    //   // sp.anchor.y = 0.5;
	    //   // sp.alpha = particle.alpha;
	    //   // sp.rotation = particle.rotation*Math.PI/180;

	  //   	sp.position.x = particle.p.x;
			// sp.position.y = particle.p.y;
			// sp.alpha = particle.alpha;
			// sp.rotation = particle.rotation;
			// sp.scale.set(particle.scale);
	    });


	    emitter.particleDead.add((particle) =>{
	        particle.sprite.visible = false;
	        // particle.sprite.alpha = 0;
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
		this._emitOnce = this._emitOnce.bind(this);
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
		this._particleImages = images;

		let sheetWidth = 0;
		let sheetHeight = 0;
		const sheetContainer = new PIXI.Container();

		// combine all the images into a single base texture sheet
		images.forEach((img) => {
			const imgSprite = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(img)));
			imgSprite.x = sheetWidth;
			sheetContainer.addChild(imgSprite);

			// save image actual size, since if the img element was resized
			// img.width and img.height are the resized values
			img.textureWidth = imgSprite.width;
			img.textureHeight = imgSprite.height;
			sheetWidth += imgSprite.width;
			// sheet height value is the largest single image height
			sheetHeight = imgSprite.height>sheetHeight?imgSprite.height:sheetHeight;
		});

		const sheetTexture = PIXI.RenderTexture.create(sheetWidth, sheetHeight);
		// draw the images sheet
		this.renderer.render(sheetContainer, sheetTexture);

		// create a texture for each particle image from the texture sheet
		const textures = [];
		let startX = 0;
		for(let i = 0;i<images.length;i++){
			const img = images[i];
			const txt = new PIXI.Texture(sheetTexture, new PIXI.Rectangle(startX, 0, img.textureWidth, img.textureHeight));

			textures.push(txt);
			startX += img.textureWidth;
		}

		this.particleTextures = textures;
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

		eval(emitterCode);
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

	_initEmitTypes(){
		const checkboxes = this.container.querySelectorAll('.check');
		checkboxes.forEach((check)=>{
			check.addEventListener('click', ()=>{
				const type = check.dataset.type;

				checkboxes.forEach((check)=>check.checked = false);
				check.checked = true;

				// reset
				this.emitOnClick = false;
				this._stopCursorFollow();

				if(type === 'tween'){
					this._updateEmitterPosition = this._tweenUpdate;
					this.emitter.p.x = 100;
					this.emitter.p.y = 100;
				}else if(type ==='follow'){
					this._updateEmitterPosition = this._cursorUpdate;
					this._startCursorFollow();
				}else{
					this._updateEmitterPosition = function () {}.bind(this);
					this.emitOnClick = true;
				}
			});
		});
	}

	_updateEmitterPosition(){

	}

	set emitOnClick(val){
		this._emitOnClick = val;
		if(val){
			this.container.addEventListener('click', this._emitOnce);
		}else{
			this.container.removeEventListener('click', this._emitOnce);
		}
	}

	_emitOnce() {
		this.running = true;
	}

	_tweenUpdate() {
		this.emitter.p.x = Math.sin(this.currentFrame*.1)*150+250;
		this.emitter.p.y = Math.cos(this.currentFrame*.1)*30+150;
	}

	_startCursorFollow() {
		this.container.addEventListener('mousemove', this._updateCursorPosition);
	}

	_updateCursorPosition(e) {
		this.cursorX = e.layerX;
		this.cursorY = e.layerY;
	}

	_stopCursorFollow(){
		this.container.removeEventListener('mousemove', this._updateCursorPosition);
	}

	_cursorUpdate() {
		const cursorX = this.cursorX || 100;
		const cursorY = this.cursorY || 100;

		if(cursorX < this.previewWidth) this.emitter.p.x = this.cursorX;
		if(cursorY < this.previewHeight) this.emitter.p.y = this.cursorY;
	}
}

module.exports = PreviewBox;
