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

import ThymeleafComponent from './thymeleaf/ThymeleafComponent.js';
import {connect}          from '../ThymeleafRedux.js';
import clearCompleted     from '../actions/clearCompleted';
import todoFooterTemplate from '../../../../todo-website/source/templates/todo-footer.html';

import {addEventDelegate} from '@ultraq/dom-utils';
import {$}                from 'dumb-query-selector';

/**
 * Looks after the info and navigation items in the footer of the todo list.
 * 
 * @author Emanuel Rabina
 */
export class TodoFooter extends ThymeleafComponent {

	/**
	 * Create a new todo footer component.
	 * 
	 * @param {Object} props
	 * @param {Object} context
	 */
	constructor(props, {templateEngine}) {

		let $todoFooter = $('#todo-footer');

		super(props, templateEngine, todoFooterTemplate, $todoFooter);

		// Clear completed todo items
		addEventDelegate($todoFooter, 'click', '.clear-completed', event => {
			let {clearCompleted} = props;
			clearCompleted();
		});
	}
}

export default connect(
	state => state,
	{
		clearCompleted
	},
	TodoFooter
);
