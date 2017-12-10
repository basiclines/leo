const path = require('path');

module.exports = {

	watch: true,

	entry: './src/leo.js',

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

