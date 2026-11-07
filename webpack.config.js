const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {

	entry: {
		leo: [
			'./src/leo.js'
		],
		list: [
			'./src/list.js'
		],
		element: [
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
			src: path.resolve(__dirname, 'src/')
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}
