/* 
 * Copyright 2017, Emanuel Rabina (http://www.ultraq.net.nz/)
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {parse} from './utilities/Properties.js';

import {format}                                 from '@ultraq/string-utils';
import {TemplateEngine, STANDARD_CONFIGURATION} from 'thymeleaf';

let messages;

/**
 * Create and configure the template engine for the todo app.
 * 
 * @return {TemplateEngine}
 */
/* global require */
export function createTemplateEngine() {
	return new TemplateEngine({
		...STANDARD_CONFIGURATION,
		messageResolver: (key, parameters) => {
			if (!messages) {
				messages = parse(require('messages/messages.properties'));
			}
			return format(messages[key], parameters);
		},
		templateResolver: templateName => {
			return require(`templates/${templateName}.html`);
		}
	});
}
