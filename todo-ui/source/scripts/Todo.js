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

import {editMode,
        markCompleted,
        readMode}           from './Actions';
import {addEventDelegate}   from './Dom';
import {createTodo,
        updateTodo}         from './TodoApi';
import todoListItemTemplate from '../../../todo-website/source/templates/todo-list-item.html';

// import 'todomvc-common/base';
import {$}                      from 'dumb-query-selector';
import keycode                  from 'keycode';
import {TemplateEngine,
        STANDARD_CONFIGURATION} from 'thymeleaf';


let templateEngine = new TemplateEngine(STANDARD_CONFIGURATION);
let todoList = $('.todo-list');

// Toggle a todo item as completed/active when the tick is clicked
addEventDelegate(todoList, 'click', '.toggle', event => {
	let {target} = event;
	let todo = target.closest('.todo');

	markCompleted(todo);

	updateTodo(todo.dataset.todoId,
		$('.view', todo).textContent.trim(),
		target.checked ? 'COMPLETED' : 'ACTIVE');
});

// Enter editing mode when item double-clicked
addEventDelegate(todoList, 'dblclick', 'label', event => {
	let {target} = event;
	let todo = target.closest('.todo');

	editMode(todo);
	let input = $('.edit', todo);
	input.focus();

	function exitEditModeAndUpdateTodo() {
		readMode(todo);
		updateTodo(todo.dataset.todoId,
			$('.edit', todo).value,
			target.checked ? 'COMPLETED' : 'ACTIVE');
		input.removeEventListener('keypress', onEnter);
		input.removeEventListener('blur', onBlur);
	}

	function onEnter(event) {
		if (keycode(event) === 'enter') {
			exitEditModeAndUpdateTodo();
		}
	}
	function onBlur(event) {
		exitEditModeAndUpdateTodo();
	}

	input.addEventListener('keypress', onEnter);
	input.addEventListener('blur', onBlur)
});

// Create new todo items
$('.new-todo').addEventListener('keypress', event => {
	if (keycode(event) === 'enter') {
		let {target} = event;
		let {value} = target;
		if (value && value.trim()) {
			createTodo(value)
				.then(todoId => {
					return templateEngine.process(todoListItemTemplate, {
						todo: {
							id: todoId,
							value
						}
					});
				})
				.then(templateAsString => {
					todoList.insertAdjacentHTML('beforeend', templateAsString);
				});
			target.value = '';
		}
	}
});
