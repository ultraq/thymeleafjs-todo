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

import deleteTodo from './deleteTodo.js';
import {
	COMPLETED_FILTER,
	filterTodos
}                 from '../utilities/Filters.js';

/**
 * Clear all completed todo items from the list (deletes them).
 * 
 * @return {Function}
 */
export default () => (dispatch, getState) => {
	let completedTodos = filterTodos(getState().todos, COMPLETED_FILTER);
	return Promise.all(completedTodos.map(completedTodo => {
		return dispatch(deleteTodo(completedTodo.id));
	}));
};
