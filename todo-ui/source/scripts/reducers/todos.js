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

import {UPDATE_TODO} from '../actions/updateTodo';

const initialTodos = [];

/**
 * Reducer for the todo list.
 * 
 * @param {Array} [todos=initialTodos]
 * @param {Object} action
 * @return {Array} Updated state.
 */
export default function(todos = initialTodos, action) {

	switch (action.type) {
		case UPDATE_TODO:
			return todos.map(todo => ({
				id: todo.id || action.todo.id,
				status: todo.status || action.todo.status,
				value: todo.value || action.todo.value
			}));
	}
	return todos;
}
