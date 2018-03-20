const path = require('path');

module.exports = {

	entry: {
		'element-fetch-render': './element-fetch-render/element-fetch-render.js',
		'element-reactive-input': './element-reactive-input/element-reactive-input.js',
		'element-handling-click': './element-handling-click/element-handling-click.js',
		'element-renders-element': './element-renders-element/element-renders-element.js',
		'element-sorting-table': './element-sorting-table/element-sorting-table.js',
		'element-searchable-table': './element-searchable-table/element-searchable-table.js'
	},

	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js'
	},

	resolve: {
		alias: {
			src: path.resolve(__dirname, '../src/'),
			native_shim: path.resolve(__dirname, '../node_modules/@webcomponents/custom-elements/src/native-shim'),
			custom_elements: path.resolve(__dirname, '../node_modules/@webcomponents/custom-elements')
		}
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}

