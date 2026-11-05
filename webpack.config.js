const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

	entry: {
		leo: [
			'@webcomponents/custom-elements/src/native-shim',
			'@webcomponents/custom-elements',
			'./src/leo.js'
		],
		list: [
			'./src/list.js'
		],
		element: [
			'@webcomponents/custom-elements/src/native-shim',
			'@webcomponents/custom-elements',
			'./src/element.js'
		],
		object: [
			'./src/object.js'
		],
	},

	optimization: {
		minimizer: [new TerserPlugin()]
	},


	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		library: 'LEO',
		libraryTarget: 'umd'
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src/'),
			native_shim: path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements/src/native-shim'),
			custom_elements: path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements')
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}
