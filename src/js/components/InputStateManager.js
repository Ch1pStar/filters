class InputStateManager {
	_inputState = {
		// Life: { label: 'Life', min: 0.1, max: 15, value: 5 },
		// Gravity: { label: 'Gravity', min: -10, max: 10, value: 0 },
		// Attraction: {
		// 	label: 'Attraction',
		// 	x: { label: 'Attraction x', min: 0, max: 1920, value: 700 },
		// 	y: { label: 'Attraction y', min: 0, max: 1080, value: 410 },
		// 	force: { label: 'Attraction Force', min: 0, max: 30, value: 15 }
		// },
		// Alpha: {
		// 	label: 'Alpha',
		// 	min: { label: 'Alpha start', min: 1, max: 0, value: 1 },
		// 	max: { label: 'Alpha end', min: 0, max: 1, value: 0 }
		// },
		// BlendMode: {
		// 	label: 'BlendMode',
		// 	blendMode: {
		// 		label: 'Blend Mode',
		// 		value: 'NORMAL',
		// 		options: [
		// 			{ key: 'normal', value: 'NORMAL', isSelected: true },
		// 			{ key: 'add', value: 'ADD', isSelected: false }
		// 		]
		// 	}
		// },
		// Rate: {
		// 	label: 'Rate',
		// 	amount: { label: 'Rate amount', min: 1, max: 15, value: 2 },
		// 	frequency: { label: 'Rate frequency', min: 0.01, max: 3, value: 0.05 }
		// },
		// Velocity: {
		// 	label: 'Velocity',
		// 	speed: { label: 'Speed', min: 1, max: 50, value: 10 },
		// 	minAngle: { label: 'Arc start', min: 0, max: 360, value: 90 },
		// 	maxAngle: { label: 'Arc end', min: 0, max: 360, value: 270 }
		// },
		GlowFilter: {
			label: 'Glow Filter',
			enabled: { label: 'enabled', checked: false },
			innerStrength: { label: 'Inner Strength', min: 0, max: 20, value: 10 },
			outerStrength: { label: 'Outer Strength', min: 0, max: 20, value: 10 },
			distance: { label: 'Distance', min: 0, max: 20, value: 10 },
			color: { label: 'Color' }
		},
		DisplacementFilter: {
			label: 'Displacement Filter',
			enabled: { label: 'enabled', checked: false },
			scaleX: { label: 'scale.x', min: 1, max: 200 },
			scaleY: { label: 'scale.y', min: 1, max: 200 }
		},
		BlurFilter: {
			label: 'Blur Filter',
			enabled: { label: 'enabled', checked: false },
			blur: { label: 'Blur', min: 1, max: 100 },
			quality: { label: 'Quality', min: 1, max: 10 }
		},
		NoiseFilter: {
			label: 'Noise Filter',
			enabled: { label: 'enabled', checked: false },
			noise: { label: 'Noise', min: 0, max: 1 },
			seed: { label: 'Seed', min: 0, max: 1 }
		},
		ColorMatrixFilter: {
			label: 'Color Matrix Filter',
			enabled: { label: 'enabled', checked: false },
			reset: { label: 'Reset' },
			sepia: { label: 'Sepia' },
			negative: { label: 'Negative' },
			kodachrome: { label: 'Kodachrome' },
			lsd: { label: 'lsd' },
			polaroid: { label: 'Polaroid' },
			desaturate: { label: 'Desaturate' },
			contrast: { label: 'Contrast' },
			greyscale: { label: 'Greyscale' },
			predator: { label: 'Predator' },
			saturate: { label: 'Saturate' }
		},
		OutlineFilter: {
			label: 'Outline Filter',
			enabled: { label: 'enabled', checked: false },
			thickness: { label: 'thickness', min: 0, max: 20, value: 10 },
			color: { label: 'color' }
		},
		DropShadowFilter: {
			label: 'DropShadow Filter',
			enabled: { label: 'enabled', checked: false },
			blur: { label: 'Blur', min: 1, max: 40, value: 10 },
			alpha: { label: 'Alpha', min: 0, max: 1, value: 0.5 },
			distance: { label: 'Distance', min: 0, max: 50, value: 0.5 },
			rotation: { label: 'Rotation', min: 0, max: 360, value: 10 },
			color: { label: 'color' }
		},
		TwistFilter: {
			label: 'DropShadow Filter',
			enabled: { label: 'enabled', checked: false },
			angle: { label: 'Angle', min: 0, max: 10, value: 5 },
			radius: { label: 'Radius', min: 0, max: 1920, value: 500 },
			x: { label: 'x', min: 0, max: 1920, value: 500 },
			y: { label: 'y', min: 0, max: 972, value: 500 }
		},
		AsciiFilter: {
			label: 'Ascii Filter',
			enabled: { label: 'enabled', checked: false },
			size: { label: 'size', min: 0, max: 20, value: 10 }
		},
		DotFilter: {
			label: 'Dot Filter',
			enabled: { label: 'enabled', checked: false },
			scale: { label: 'Scale', min: 0, max: 1, value: 0.5 },
			angle: { label: 'Angle', min: 0, max: 5, value: 5 }
		},
		EmbrossFilter: {
			label: 'Embross Filter',
			enabled: { label: 'enabled', checked: false },
			strength: { label: 'strength', min: 0, max: 20, value: 10 }
		},
		PixelateFilter: {
			label: 'Pixelate Filter',
			enabled: { label: 'enabled', checked: false },
			sizeX: { label: 'sizeX', min: 4, max: 40, value: 15 },
			sizeY: { label: 'sizeY', min: 4, max: 40, value: 15 }
		},
		RGBSplitFilter: {
			label: 'RGBSplit Filter',
			enabled: { label: 'enabled', checked: false },
			redX: { label: 'redX', min: -20, max: 20, value: 15 },
			redY: { label: 'redY', min: -20, max: 20, value: 15 },
			greenX: { label: 'greenX', min: -20, max: 20, value: 15 },
			greenY: { label: 'greenY', min: -20, max: 20, value: 15 },
			blueX: { label: 'blueX', min: -20, max: 20, value: 15 },
			blueY: { label: 'blueY', min: -20, max: 20, value: 15 }
		},
		CrossHatchFilter: {
			label: 'Cross Hatch',
			enabled: { label: 'enabled', checked: false }
		},
		ConvolutionFilter: {
			label: 'Convolution Filter',
			enabled: { label: 'enabled', checked: false },
			width: { label: 'width', min: 0, max: 500, value: 15 },
			height: { label: 'height', min: 0, max: 500, value: 15 }
		},
		BloomFilter: {
			label: 'Bloom Filter',
			enabled: { label: 'enabled', checked: false },
			blur: { label: 'blur', min: 0, max: 20, value: 15 },
			blurX: { label: 'blurX', min: 0, max: 20, value: 15 },
			blurY: { label: 'blurY', min: 0, max: 20, value: 15 }
		},
		TiltShiftFilter: {
			label: 'TiltShift Filter',
			enabled: { label: 'enabled', checked: false },
			blur: { label: 'blur', min: 0, max: 200, value: 15 },
			gradientBlur: { label: 'gradientBlur', min: 0, max: 200, value: 15 }
		},
		ShockwaveFilter: {
			label: 'Shockwave Filter',
			enabled: { label: 'enabled', checked: false },
			time: { label: 'Time', min: 0, max: 1, value: 0.5 },
			centerX: { label: 'Center.x', min: 0, max: 1, value: 0.5 },
			centerY: { label: 'Center.y', min: 0, max: 1, value: 0.5 }
		},
		BulgePinchFilter: {
			label: 'BulgePinchFilter',
			enabled: { label: 'enabled', checked: false },
			radius: { label: 'radius', min: 0, max: 1000, value: 0.5 },
			strength: { label: 'strength', min: 0, max: 1, value: 0.5 },
			centerX: { label: 'Center.x', min: 0, max: 1, value: 0.5 },
			centerY: { label: 'Center.y', min: 0, max: 1, value: 0.5 }
		},
		ColorReplaceFilter: {
			label: 'ColorReplaceFilter',
			enabled: { label: 'enabled', checked: false },
			originalColor: { label: 'originalColor' },
			newColor: { label: 'newColor' },
			epsilon: { label: 'Epsilon', min: 0, max: 1, value: 0.5 }
		},
		MultiColorReplaceFilter: {
			label: 'MultiColorReplaceFilter',
			enabled: { label: 'enabled', checked: false },
			original0: { label: 'original0' },
			target0: { label: 'target0' },
			original1: { label: 'original1' },
			target1: { label: 'target1' },
			original2: { label: 'original2' },
			target2: { label: 'target2' },
			epsilon: { label: 'Epsilon', min: 0, max: 1, value: 0.5 }
		},
		SimpleLightmapFilter: {
			label: 'SimpleLightmapFilter',
			enabled: { label: 'enabled', checked: false },
			color: { label: 'color' },
			alpha: { label: 'alpha', min: 0, max: 1, value: 0.5 }
		},
		GodrayFilter: {
			label: 'GodrayFilter',
			enabled: { label: 'enabled', checked: false },
			time: { label: 'time', min: 0, max: 1, value: 0 },
			angle: { label: 'angle', min: 0, max: 60, value: 30 },
			gain: { label: 'gain', min: 0, max: 1, value: 0 },
			lacunarity: { label: 'lacunarity', min: 0, max: 5, value: 0 }
		},
		ZoomBlurFilter: {
			label: 'ZoomBlurFilter',
			enabled: { label: 'enabled', checked: false },
			strength: { label: 'strength', min: 0, max: 0.5, value: 0 },
			centerX: { label: 'centerX', min: 0, max: 1920, value: 900 },
			centerY: { label: 'centerY', min: 0, max: 1920, value: 900 },
			innerRadius: { label: 'innerRadius', min: 0, max: 960, value: 360 }
		}
	};

	_states = {};

	get state() {
		return this._inputState;
	}

	get states() {
		let list = localStorage.getItem('particle_editor_state_list') || '';

		list = list.split(', ').filter(Boolean);

		return list;
	}

	getSavedState(label = 'default') {
		const stored = localStorage.getItem(`particle_editor_state_${label}`);
		const state = stored ? JSON.parse(stored) : this.state;

		return state;
	}

	setState(state, label = 'default') {
		this._states[label] = state;
	}

	saveState(label = 'default') {
		let list = localStorage.getItem('particle_editor_state_list') || '';

		if (!list.match(label)) list = list.length ? `${list}, ${label}` : label;

		localStorage.setItem('particle_editor_state_list', list);

		localStorage.setItem(`particle_editor_state_${label}`, JSON.stringify(this._states[label]));
	}
}

module.exports = InputStateManager;
