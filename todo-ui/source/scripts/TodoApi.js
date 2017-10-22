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

/**
 * Create a new todo item at the server.
 *
 * @param {String} value
 * @return {Promise}
 */
export function createTodo(value) {

	return fetch('/todos', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			value
		})
	})
		.then(response => {
			if (response.ok) {
				return response.headers.get('Location').substring(7);
			}
		});
}

/**
 * Delete a todo item from the server.
 * 
 * @param {String} id
 * @return {Promise}
 */
export function deleteTodo(id) {

	return fetch(`/todos/${id}`, {
		method: 'DELETE'
	});
}

/**
 * Update the todo item at the server.
 * 
 * @param {String} id
 * @param {String} value
 * @param {String} status
 * @return {Promise}
 */
export function updateTodo(id, value, status) {

	return fetch(`/todos/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			value,
			status
		})
	})
}