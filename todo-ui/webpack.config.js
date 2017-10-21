'use strict';

const path           = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './source/scripts/Todo.js',
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'scripts'),
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true,
			uglifyOptions: {
				mangle: false
			}
		})
	],
	devtool: '#source-map'
};
