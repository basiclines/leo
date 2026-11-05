const path = require('path');

module.exports = {

	entry: {
		'shared-state': './shared-state/shared-state.js',
		'keyed-list': './keyed-list/keyed-list.js',
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
			leo: path.resolve(__dirname, '../src/leo.js'),
			src: path.resolve(__dirname, '../src'),
			native_shim: path.resolve(__dirname, '../node_modules/@webcomponents/custom-elements/src/native-shim'),
			custom_elements: path.resolve(__dirname, '../node_modules/@webcomponents/custom-elements')
		}
	},

	optimization: {
		minimizer: [new (require('terser-webpack-plugin'))()]
	},

	module: {
		rules: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
		]
	}
}
