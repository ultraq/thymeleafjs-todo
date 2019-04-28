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

import ThymeleafView      from './thymeleaf/ThymeleafView';
import createTodo         from '../actions/createTodo';
import deleteTodo         from '../actions/deleteTodo';
import editTodo           from '../actions/editTodo';
import toggleCompleted    from '../actions/toggleCompleted';
import todoListTemplate   from '../../../../todo-website/source/templates/todo-list.html';

import {addEventDelegate} from '@ultraq/dom-utils';
import {$}                from 'dumb-query-selector';
import keycode            from 'keycode';

const $todoList = $('#todo-list');

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

		super($todoList, todoListTemplate);

		// Create new todo items
		$('.new-todo').addEventListener('keypress', event => {
			if (keycode(event) === 'enter') {
				let {target} = event;
				let {value} = target;
				if (value && value.trim()) {
					store.dispatch(createTodo(value));
					target.value = '';
				}
			}
		});

		// Toggle a todo item as completed/active when the tick is clicked
		addEventDelegate($todoList, 'click', '.toggle', event => {
			let {target} = event;
			let $todo = target.closest('.todo');
			store.dispatch(toggleCompleted($todo.dataset.todoId));
		});

		// Delete a todo item when the X is clicked
		addEventDelegate($todoList, 'click', '.destroy', event => {
			let {target} = event;
			let $todo = target.closest('.todo');
			store.dispatch(deleteTodo($todo.dataset.todoId));
		});

		// Enter editing mode when item double-clicked
		addEventDelegate($todoList, 'dblclick', 'label', event => {
			let {target} = event;
			let $todo = target.closest('.todo');

			$todo.classList.add('editing');

			let $input = $('.edit', $todo);
			$input.focus();

			function exitEditModeAndUpdateTodo() {
				$todo.classList.remove('editing');
				store.dispatch(editTodo($todo.dataset.todoId, $input.value));
				$input.removeEventListener('keypress', onEnter);
				$input.removeEventListener('blur', onBlur);
			}

			function onEnter(event) {
				if (keycode(event) === 'enter') {
					exitEditModeAndUpdateTodo();
				}
			}
			function onBlur(event) {
				exitEditModeAndUpdateTodo();
			}

			$input.addEventListener('keypress', onEnter);
			$input.addEventListener('blur', onBlur);
		});
	}
}
