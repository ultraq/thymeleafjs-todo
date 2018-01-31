/* eslint-env node */
'use strict';

const path           = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = function(env, args) {
	return {
		entry: './source/scripts/Todo.js',
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
					use: {
						loader: 'html-loader',
						options: {
							attrs: false
						}
					}
				}
			]
		},
		resolve: {
			alias: {
				templates: path.resolve(__dirname, '../todo-website/source/templates')
			}
		},
		plugins: [
			new DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			})/*,
			new UglifyJsPlugin({
				sourceMap: true,
				uglifyOptions: {
					mangle: false
				}
			})*/
		],
		devtool: '#source-map'
	};
};
