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

import {CREATE_TODO} from '../actions/createTodo.js';
import {DELETE_TODO} from '../actions/deleteTodo.js';
import {UPDATE_TODO} from '../actions/updateTodo.js';

import {$} from 'dumb-query-selector';

const initialState = JSON.parse($('#initial-todos').textContent);

/**
 * Reducer for the todo list.
 * 
 * @param {Array} [state=initialState]
 * @param {Object} action
 * @return {Array} Updated state.
 */
export default function(state = initialState, action) {
	switch (action.type) {
		case CREATE_TODO:
			return state.concat(action.todo);
		case DELETE_TODO:
			return state.filter(todo => todo.id !== action.todoId);
		case UPDATE_TODO:
			return state.map(todo => todo.id === action.todo.id ? action.todo : todo);
	}
	return state;
}
