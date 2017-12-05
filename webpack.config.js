const path = require('path');

module.exports = {

	watch: true,

	entry: './src/example.js',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'leo.js'
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, 'src/'),
		}
	}
}

