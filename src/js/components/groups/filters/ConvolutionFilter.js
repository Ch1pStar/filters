const Group = require('../abstract/Group');
const InputRange = require('dope-components').InputRange;

class ConvolutionFilter extends Group {
	_initInput() {
		const matrixZeroZero = (this.matrixZeroZeroInput = new InputRange());
		const matrixZeroOne = (this.matrixZeroOneInput = new InputRange());
		const matrixZeroTwo = (this.matrixZeroTwoInput = new InputRange());
		const matrixOneZero = (this.matrixOneZeroInput = new InputRange());
		const matrixOneOne = (this.matrixOneOneInput = new InputRange());
		const matrixOneTwo = (this.matrixOneTwoInput = new InputRange());
		const matrixTwoZero = (this.matrixTwoZeroInput = new InputRange());
		const matrixTwoOne = (this.matrixTwoOneInput = new InputRange());
		const matrixTwoTwo = (this.matrixTwoTwoInput = new InputRange());
		const width = (this.widthInput = new InputRange());
		const height = (this.heightInput = new InputRange());
		const state = this.options;

		this.inputs = [
			matrixZeroZero,
			matrixZeroOne,
			matrixZeroTwo,
			matrixOneZero,
			matrixOneOne,
			matrixOneTwo,
			matrixTwoZero,
			matrixTwoOne,
			matrixTwoTwo,
			width,
			height
		];

		this.matrixZeroZeroInput.setState(state.matrixZeroZero);
		this.matrixZeroOneInput.setState(state.matrixZeroOne);
		this.matrixZeroTwoInput.setState(state.matrixZeroTwo);
		this.matrixOneZeroInput.setState(state.matrixOneZero);
		this.matrixOneOneInput.setState(state.matrixOneOne);
		this.matrixOneTwoInput.setState(state.matrixOneTwo);
		this.matrixTwoZeroInput.setState(state.matrixTwoZero);
		this.matrixTwoOneInput.setState(state.matrixTwoOne);
		this.matrixTwoTwoInput.setState(state.matrixTwoTwo);
		this.widthInput.setState(state.width);
		this.heightInput.setState(state.height);
		super._initInput();
	}

	get fields() {
		return {
			matrixZeroZero: this.matrixZeroZeroInput.state.value,
			matrixZeroOne: this.matrixZeroOneInput.state.value,
			matrixZeroTwo: this.matrixZeroTwoInput.state.value,
			matrixOneZero: this.matrixOneZeroInput.state.value,
			matrixOneOne: this.matrixOneOneInput.state.value,
			matrixOneTwo: this.matrixOneTwoInput.state.value,
			matrixTwoZero: this.matrixTwoZeroInput.state.value,
			matrixTwoOne: this.matrixTwoOneInput.state.value,
			matrixTwoTwo: this.matrixTwoTwoInput.state.value,
			width: this.widthInput.state.value,
			height: this.heightInput.state.value
		};
	}

	// get state() {
	// 	return {
	// 		enabled: this.enabledInput.state,
	// 		width: this.widthInput.state,
	// 		height: this.heightInput.state
	// 	};
	// }
}

module.exports = ConvolutionFilter;
