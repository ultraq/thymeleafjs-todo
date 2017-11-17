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

import {updateTodo} from './updateTodo';

import {$} from 'dumb-query-selector';

/**
 * Mark the selected todo item as completed.
 * 
 * @param {String} todoId
 * @return {Function}
 *   A redux thunk for updating the server with the completion status and then
 *   reflecting that in the store.
 */
const toggleCompleted = todoId => (dispatch, getState) => {

	// For instant feedback, although a re-render will do this anyway
	$(`[data-todo-id="${todoId}"]`).classList.toggle('completed');

	let todo = getState().todos.find(todo => todo.id === todoId);
	return updateTodo({
		...todo,
		completed: true,
		status: todo.status === 'COMPLETED' ? 'ACTIVE' : 'COMPLETED'
	})(dispatch);
};

export default toggleCompleted;
