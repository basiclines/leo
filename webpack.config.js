const path = require('path');

module.exports = {

	watch: true,

	entry: './src/example.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'model.js'
	},

	resolve: {
		// Replace modules with other modules or paths for compatibility or convenience
		alias: {
			src: path.resolve(__dirname, 'src/'),
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
};

