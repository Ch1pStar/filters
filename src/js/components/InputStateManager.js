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
			label: 'GlowFilter',
			enabled: { label: 'enabled' },
			innerStrength: { label: 'Inner Strength', min: 0, max: 20, value: 10, step: 0.01 },
			outerStrength: { label: 'Outer Strength', min: 0, max: 20, value: 10, step: 0.01 },
			distance: { label: 'Distance', min: 0, max: 20, value: 10, step: 0.01 },
			color: { label: 'Color' },
			quality: { label: 'Quality', min: 0, max: 20, value: 10, step: 0.01 }
		},
		DisplacementFilter: {
			label: 'DisplacementFilter',
			enabled: { label: 'enabled' },
			scaleX: { label: 'scale.x', min: 1, max: 200, step: 0.01 },
			scaleY: { label: 'scale.y', min: 1, max: 200, step: 0.01 }
		},
		BlurFilter: {
			label: 'BlurFilter',
			enabled: { label: 'enabled' },
			blur: { label: 'Blur', min: 1, max: 100, step: 0.01 },
			quality: { label: 'Quality', min: 1, max: 10, step: 0.01 }
		},
		NoiseFilter: {
			label: 'NoiseFilter',
			enabled: { label: 'enabled' },
			noise: { label: 'Noise', min: 0, max: 1, step: 0.01 },
			seed: { label: 'Seed', min: 0, max: 1, step: 0.01 }
		},
		ColorMatrixFilter: {
			label: 'ColorMatrixFilter',
			enabled: { label: 'enabled' },
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
			label: 'OutlineFilter',
			enabled: { label: 'enabled' },
			thickness: { label: 'thickness', min: 0, max: 20, value: 10, step: 0.01 },
			color: { label: 'color' }
		},
		DropShadowFilter: {
			label: 'DropShadowFilter',
			enabled: { label: 'enabled' },
			blur: { label: 'Blur', min: 1, max: 40, value: 10, step: 0.01 },
			alpha: { label: 'Alpha', min: 0, max: 1, value: 0.5, step: 0.01 },
			distance: { label: 'Distance', min: 0, max: 50, value: 0.5, step: 0.01 },
			rotation: { label: 'Rotation', min: 0, max: 360, value: 10, step: 0.01 },
			color: { label: 'color' }
		},
		TwistFilter: {
			label: 'TwistFilter',
			enabled: { label: 'enabled', isClicked: false },
			angle: { label: 'Angle', min: 0, max: 10, value: 5, step: 0.01 },
			radius: { label: 'Radius', min: 0, max: 1920, value: 500, step: 0.01 },
			x: { label: 'x', min: 0, max: 1920, value: 500, step: 0.01 },
			y: { label: 'y', min: 0, max: 972, value: 500, step: 0.01 }
		},
		AsciiFilter: {
			label: 'AsciiFilter',
			enabled: { label: 'enabled' },
			size: { label: 'size', min: 0, max: 20, value: 10, step: 0.01 }
		},
		DotFilter: {
			label: 'DotFilter',
			enabled: { label: 'enabled' },
			scale: { label: 'Scale', min: 0, max: 1, value: 0.5, step: 0.01 },
			angle: { label: 'Angle', min: 0, max: 5, value: 5, step: 0.01 }
		},
		EmbossFilter: {
			label: 'EmbossFilter',
			enabled: { label: 'enabled' },
			strength: { label: 'strength', min: 0, max: 20, value: 10, step: 0.01 }
		},
		PixelateFilter: {
			label: 'PixelateFilter',
			enabled: { label: 'enabled' },
			sizeX: { label: 'sizeX', min: 4, max: 40, value: 15, step: 0.01 },
			sizeY: { label: 'sizeY', min: 4, max: 40, value: 15, step: 0.01 }
		},
		RGBSplitFilter: {
			label: 'RGBSplitFilter',
			enabled: { label: 'enabled' },
			redX: { label: 'redX', min: -20, max: 20, value: 15, step: 0.01 },
			redY: { label: 'redY', min: -20, max: 20, value: 15, step: 0.01 },
			greenX: { label: 'greenX', min: -20, max: 20, value: 15, step: 0.01 },
			greenY: { label: 'greenY', min: -20, max: 20, value: 15, step: 0.01 },
			blueX: { label: 'blueX', min: -20, max: 20, value: 15, step: 0.01 },
			blueY: { label: 'blueY', min: -20, max: 20, value: 15, step: 0.01 }
		},
		CrossHatchFilter: {
			label: 'CrossHatch',
			enabled: { label: 'enabled' }
		},
		ConvolutionFilter: {
			label: 'ConvolutionFilter',
			enabled: { label: 'enabled' },
			width: { label: 'width', min: 0, max: 500, value: 15, step: 0.01 },
			height: { label: 'height', min: 0, max: 500, value: 15, step: 0.01 }
		},
		BloomFilter: {
			label: 'BloomFilter',
			enabled: { label: 'enabled' },
			blur: { label: 'blur', min: 0, max: 20, value: 15, step: 0.01 },
			blurX: { label: 'blurX', min: 0, max: 20, value: 15, step: 0.01 },
			blurY: { label: 'blurY', min: 0, max: 20, value: 15, step: 0.01 }
		},
		TiltShiftFilter: {
			label: 'TiltShiftFilter',
			enabled: { label: 'enabled' },
			blur: { label: 'blur', min: 0, max: 200, value: 15 },
			gradientBlur: { label: 'gradientBlur', min: 0, max: 200, value: 15, step: 0.01 }
		},
		ShockwaveFilter: {
			label: 'ShockwaveFilter',
			enabled: { label: 'enabled' },
			time: { label: 'Time', min: 0, max: 1, value: 0.5, step: 0.01 },
			centerX: { label: 'Center.x', min: 0, max: 1, value: 0.5, step: 0.01 },
			centerY: { label: 'Center.y', min: 0, max: 1, value: 0.5, step: 0.01 }
		},
		BulgePinchFilter: {
			label: 'BulgePinchFilter',
			enabled: { label: 'enabled' },
			radius: { label: 'radius', min: 0, max: 1000, value: 0.5, step: 0.01 },
			strength: { label: 'strength', min: 0, max: 1, value: 0.5, step: 0.01 },
			centerX: { label: 'Center.x', min: 0, max: 1, value: 0.5, step: 0.01 },
			centerY: { label: 'Center.y', min: 0, max: 1, value: 0.5, step: 0.01 }
		},
		ColorReplaceFilter: {
			label: 'ColorReplaceFilter',
			enabled: { label: 'enabled' },
			originalColor: { label: 'originalColor' },
			newColor: { label: 'newColor' },
			epsilon: { label: 'Epsilon', min: 0, max: 1, value: 0.5, step: 0.01 }
		},
		MultiColorReplaceFilter: {
			label: 'MultiColorReplaceFilter',
			enabled: { label: 'enabled' },
			original0: { label: 'original0' },
			target0: { label: 'target0' },
			original1: { label: 'original1' },
			target1: { label: 'target1' },
			original2: { label: 'original2' },
			target2: { label: 'target2' },
			epsilon: { label: 'Epsilon', min: 0, max: 1, value: 0.5, step: 0.01 }
		},
		SimpleLightmapFilter: {
			label: 'SimpleLightmapFilter',
			enabled: { label: 'enabled' },
			color: { label: 'color' },
			alpha: { label: 'alpha', min: 0, max: 1, value: 0.5, step: 0.01 }
		},
		GodrayFilter: {
			label: 'GodrayFilter',
			enabled: { label: 'enabled' },
			time: { label: 'time', min: 0, max: 1, value: 0, step: 0.01 },
			angle: { label: 'angle', min: 0, max: 60, value: 30, step: 0.01 },
			gain: { label: 'gain', min: 0, max: 1, value: 0, step: 0.01 },
			lacunarity: { label: 'lacunarity', min: 0, max: 5, value: 0, step: 0.01 }
		},
		ZoomBlurFilter: {
			label: 'ZoomBlurFilter',
			enabled: { label: 'enabled', isChecked: false },
			strength: { label: 'strength', min: 0, max: 0.5, value: 0, step: 0.01 },
			centerX: { label: 'centerX', min: 0, max: 1920, value: 900, step: 0.01 },
			centerY: { label: 'centerY', min: 0, max: 1920, value: 900, step: 0.01 },
			innerRadius: { label: 'innerRadius', min: 0, max: 960, value: 360, step: 0.01 }
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
