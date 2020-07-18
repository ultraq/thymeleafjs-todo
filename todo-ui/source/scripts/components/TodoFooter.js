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

import ThymeleafView      from './thymeleaf/ThymeleafView.js';
import clearCompleted     from '../actions/clearCompleted.js';
import todoFooterTemplate from '../../../../todo-website/source/templates/todo-footer.html';

import {addEventDelegate} from '@ultraq/dom-utils';
import {$}                from 'dumb-query-selector';

/**
 * Looks after the info and navigation items in the footer of the todo list.
 * 
 * @author Emanuel Rabina
 */
export default class TodoFooter extends ThymeleafView {

	/**
	 * Create a new todo footer component.
	 * 
	 * @param {Object} store
	 */
	constructor(store) {

		const $todoFooter = $('#todo-footer');
		super($todoFooter, todoFooterTemplate);
		this.store = store;

		// Attach event handlers for working with the footer
		addEventDelegate($todoFooter, 'click', '.clear-completed', event => this.clearCompletedTodos(event));
	}

	/**
	 * Clear all completed todo items.
	 *
	 * @param {Event} event
	 */
	clearCompletedTodos(event) {

		this.store.dispatch(clearCompleted());
	}
}
