const path = require('path');

module.exports = {
	watch: true,
	entry: './src/model.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'model.js'
	},
	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
};

