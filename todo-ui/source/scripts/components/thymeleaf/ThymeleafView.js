/* 
 * Copyright 2018, Emanuel Rabina (http://www.ultraq.net.nz/)
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
 * Matched component and template that, when rendered, updates the HTML of the
 * given element container.
 * 
 * @author Emanuel Rabina
 */
export default class ThymeleafView {

	/**
	 * @param {Element} container
	 * @param {String} template
	 */
	constructor(container, template) {

		this.container = container;
		this.template = template;
	}

	/**
	 * Render the template with the given context.
	 * 
	 * @param {TemplateEngine} templateEngine
	 * @param {Object} context
	 * @return {Promise<String>}
	 */
	render(templateEngine, context) {

		return templateEngine.process(this.template, context)
			.then(htmlString => {
				this.container.innerHTML = htmlString;
				return htmlString;
			});
	}
}
