const path = require('path');

module.exports = {

	entry: [
		'@webcomponents/custom-elements/src/native-shim',
		'@webcomponents/custom-elements',
		'./src/leo.js'
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'leo.js'
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src/'),
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}

