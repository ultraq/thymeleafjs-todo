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

import {$} from 'dumb-query-selector';

/**
 * Mark the todo item as completed.
 * 
 * @param {Element} todo
 */
export function markCompleted(todo) {

	todo.classList.toggle('completed');
}

/**
 * Go into editing mode for the todo item.
 * 
 * @param {Element} todo
 */
export function editMode(todo) {

	todo.classList.add('editing');
}

/**
 * Go into read-only mode for the todo item.
 * 
 * @param {Element} todo
 */
export function readMode(todo) {

	todo.classList.remove('editing');
	$('.view label', todo).textContent = $('.edit', todo).value;
}
