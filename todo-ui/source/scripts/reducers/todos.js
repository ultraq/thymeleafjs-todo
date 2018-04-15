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

import {CREATE_TODO} from '../actions/createTodo';
import {DELETE_TODO} from '../actions/deleteTodo';
import {UPDATE_TODO} from '../actions/updateTodo';

import {$} from 'dumb-query-selector';

/**
 * @private
 * @param {Array} todos
 * @return {Object}
 */
function buildStateFromTodos(todos) {
	return {
		todos,
		activeTodos: todos.filter(todo => todo.status === 'ACTIVE'),
		completedTodos: todos.filter(todo => todo.status === 'COMPLETED')
	};
}

const initialTodos = JSON.parse($('#initial-todos').textContent);
const initialState = buildStateFromTodos(initialTodos);

/**
 * Reducer for the todo list.
 * 
 * @param {Object} [state=initialState]
 * @param {Object} action
 * @return {Object} Updated state.
 */
export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_TODO:
			return buildStateFromTodos(
				state.todos.concat(action.todo)
			);
		case DELETE_TODO:
			return buildStateFromTodos(
				state.todos.filter(todo => todo.id !== action.todoId)
			);
		case UPDATE_TODO:
			return buildStateFromTodos(
				state.todos.map(todo => todo.id === action.todo.id ? action.todo : todo)
			);
	}
	return state;
}
