/* eslint-env node */
'use strict';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './source/scripts/Todo.js',
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true
		})
	],
	devtool: '#source-map'
};
