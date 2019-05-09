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

import {checkStatus} from '@ultraq/fetch-utils';

export const UPDATE_TODO = 'UPDATE_TODO';

/**
 * Update the todo item at the server.
 * 
 * @param {Object} todo
 * @return {Function}
 *   A redux thunk which updates the todo item at the server before reflecting
 *   the update to the store.
 */
export default todo => dispatch => {
	return fetch(`/todos/${todo.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(todo)
	})
		.then(checkStatus)
		.then(() => {
			dispatch({
				type: UPDATE_TODO,
				todo
			});
		});
};
