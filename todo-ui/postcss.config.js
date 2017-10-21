'use strict';

const cssnano  = require('cssnano');
const atImport = require('postcss-import');

module.exports = function(context) {
	return {
		map: context.options.map,
		plugins: [
			atImport(),
			cssnano()
		]
	};
};
