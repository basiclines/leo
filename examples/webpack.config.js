const path = require('path');

module.exports = {

	entry: {
		'element-fetch-render': './element-fetch-render/element-fetch-render.js',
		'element-reactive-input': './element-reactive-input/element-reactive-input.js'
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, '../src/'),
			native_shim: path.resolve(__dirname, '../node_modules/@webcomponents/custom-elements/src/native-shim'),
			custom_elements: path.resolve(__dirname, '../node_modules/@webcomponents/custom-elements')
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}

