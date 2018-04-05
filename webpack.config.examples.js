const path = require('path');

module.exports = {

	entry: {
		'element-fetch-render': './examples/element-fetch-render/element-fetch-render.js',
		'element-reactive-input': './examples/element-reactive-input/element-reactive-input.js',
		'element-handling-click': './examples/element-handling-click/element-handling-click.js',
		'element-renders-element': './examples/element-renders-element/element-renders-element.js',
		'element-sorting-table': './examples/element-sorting-table/element-sorting-table.js',
		'element-searchable-table': './examples/element-searchable-table/element-searchable-table.js'
	},

	output: {
		path: path.resolve(__dirname, './examples/dist'),
		filename: '[name].js'
	},

	resolve: {
		alias: {
			leo: path.resolve(__dirname, 'dist/leo.js')
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}

