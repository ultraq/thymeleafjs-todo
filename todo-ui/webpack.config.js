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
			},
			{
				test: /\.js$/,
				use: 'source-map-loader',
				enforce: 'pre'
			},
			{
				test: /\.html$/,
				use: 'html-loader'
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
