/* eslint-env node */
'use strict';

const path = require('path');

module.exports = {
	mode: 'development',
	entry: './source/scripts/Todo.js',
	output: {
		path: path.resolve(__dirname, '../todo-website/source/static/scripts'),
		filename: 'todo.min.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: path.resolve(__dirname, 'source/scripts'),
				use: 'babel-loader'
			},
			{
				test: /\.js$/,
				use: 'source-map-loader',
				enforce: 'pre'
			},
			{
				test: /\.html$/,
				use: 'raw-loader'
			}
		]
	},
	resolve: {
		alias: {
			templates: path.resolve(__dirname, '../todo-website/source/templates')
		}
	},
	devtool: '#source-map'
};
