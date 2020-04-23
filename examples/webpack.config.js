const path = require('path');

module.exports = {

	entry: {
		'element-fetch-render': './element-fetch-render/element-fetch-render.js',
		'element-reactive-input': './element-reactive-input/element-reactive-input.js',
		'element-handling-click': './element-handling-click/element-handling-click.js',
		'element-renders-element': './element-renders-element/element-renders-element.js',
		'element-sorting-table': './element-sorting-table/element-sorting-table.js',
		'element-searchable-table': './element-searchable-table/element-searchable-table.js',
		'list-create': './list-create/list-create.js'
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},

	resolve: {
		alias: {
			leo: path.resolve(__dirname, './node_modules/@basiclines/leo/dist/leo.js')
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}

