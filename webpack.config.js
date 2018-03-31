const path = require('path');

module.exports = {

	entry: [
		'@webcomponents/custom-elements/src/native-shim',
		'@webcomponents/custom-elements',
		'./src/leo.js'
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'leo.js',
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

