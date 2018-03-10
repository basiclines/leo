const path = require('path');

module.exports = {

	entry: './examples/index.js',

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index.js'
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, '../src/'),
		}
	}
}

