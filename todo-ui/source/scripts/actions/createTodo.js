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

import {checkStatus} from '../utilities/Fetch';

export const CREATE_TODO = 'CREATE_TODO';

/**
 * Create a new todo item.
 * 
 * @param {String} value
 * @return {Function}
 *   A redux thunk for creating a new todo item at the server and updating the
 *   state with it.
 */
export const createTodo = value => dispatch => {
	return fetch('/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			value
		})
	})
		.then(checkStatus)
		.then(response => {
			dispatch({
				type: CREATE_TODO,
				todo: {
					id: response.headers.get('Location').substring(7),
					status: 'ACTIVE',
					value
				}
			});
		});
};
