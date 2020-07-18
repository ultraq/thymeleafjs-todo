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

import ThymeleafView      from './thymeleaf/ThymeleafView.js';
import createTodo         from '../actions/createTodo.js';
import deleteTodo         from '../actions/deleteTodo.js';
import editTodo           from '../actions/editTodo.js';
import toggleCompleted    from '../actions/toggleCompleted.js';
import todoListTemplate   from '../../../../todo-website/source/templates/todo-list.html';

import {addEventDelegate} from '@ultraq/dom-utils';
import {$}                from 'dumb-query-selector';
import keycode            from 'keycode';

/**
 * Todo list component, which is the main UI for the app.  Looks over actions
 * that aren't to do with individual todo items, and re-renders the todo list
 * when something changes.
 * 
 * @author Emanuel Rabina
 */
export default class TodoList extends ThymeleafView {

	/**
	 * Create a new todo list component.
	 * 
	 * @param {Object} store
	 */
	constructor(store) {

		const $todoList = $('#todo-list');
		super($todoList, todoListTemplate);
		this.store = store;

		// Attach event handlers for working with the list
		$('.new-todo').addEventListener('keypress', event => {
			if (keycode(event) === 'enter') {
				this.createTodo(event);
			}
		});
		addEventDelegate($todoList, 'click', '.toggle', event => this.toggleTodo(event));
		addEventDelegate($todoList, 'click', '.destroy', event => this.deleteTodo(event));
		addEventDelegate($todoList, 'dblclick', 'label', event => this.editTodo(event));
	}

	/**
	 * Create new todo items.
	 * 
	 * @param {Event} event
	 */
	createTodo(event) {

		let {target} = event;
		let {value} = target;
		if (value?.trim()) {
			this.store.dispatch(createTodo(value));
			target.value = '';
		}
	}

	/**
	 * Delete a todo item.
	 * 
	 * @param {Event} event
	 */
	deleteTodo(event) {

		let {target} = event;
		let $todo = target.closest('.todo');
		this.store.dispatch(deleteTodo($todo.dataset.todoId));
	}

	/**
	 * Edit a todo item.
	 * 
	 * @param {Event} event
	 */
	editTodo(event) {

		let {target} = event;
		let $todo = target.closest('.todo');
		let $input = $('.edit', $todo);

		// Enter editing mode
		$todo.classList.add('editing');
		$input.focus();

		// Leave editing mode
		const exitEditModeAndUpdateTodo = () => {
			$todo.classList.remove('editing');
			this.store.dispatch(editTodo($todo.dataset.todoId, $input.value));
			$input.removeEventListener('keypress', onEnter);
			$input.removeEventListener('blur', onBlur);
		};

		const onEnter = (event) => {
			if (keycode(event) === 'enter') {
				exitEditModeAndUpdateTodo();
			}
		};
		const onBlur = () => {
			exitEditModeAndUpdateTodo();
		};

		$input.addEventListener('keypress', onEnter);
		$input.addEventListener('blur', onBlur);
	}

	/**
	 * Toggle a todo item as completed/active.
	 * 
	 * @param {Event} event
	 */
	toggleTodo(event) {

		let {target} = event;
		let $todo = target.closest('.todo');
		this.store.dispatch(toggleCompleted($todo.dataset.todoId));
	}
}
