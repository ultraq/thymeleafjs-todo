/* 
 * Copyright 2019, Emanuel Rabina (http://www.ultraq.net.nz/)
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

/**
 * @private
 * @param {Object} state
 * @param {Function} onChange
 * @return {Object}
 */
function stateHandler(state, onChange) {
	return new Proxy(state, {
		set(target, property, value, receiver) {
			let result = Reflect.set(...arguments);
			onChange();
			return result;
		}
	});
}

/**
 * A matched Thymeleaf template engine and template that automatically renders
 * into an HTML element whenever any of the data in the state object is
 * modified.
 * 
 * @author Emanuel Rabina
 */
export default class ThymeleafComponent {

	/**
	 * Constructor, ties the various parameters together to work as a single
	 * automatically-rendered component.
	 * 
	 * @param {Object} props
	 * @param {TemplateEngine} templateEngine
	 * @param {String} template
	 * @param {Element} container
	 */
	constructor(props, templateEngine, template, container) {

		this.state = stateHandler(props, () => render());

		/* 
		 * Render the Thymeleaf template using the current state as template data.
		 */
		const render = () => {
			return templateEngine.process(template, {
				...this.state
			})
				.then(htmlString => {
					container.innerHTML = htmlString;
					return htmlString;
				});
		};
	}
}
