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

import filter from './reducers/filter.js';
import todos  from './reducers/todos.js';

import {configureStore} from '@reduxjs/toolkit';

/**
 * Create a redux store for the todo app.  Includes integration with the redux
 * devtools extension for browsers.
 * 
 * @param {Object} [initialState]
 * @return {Store}
 */
export function createStore(initialState) {
	return configureStore({
		preloadedState: initialState,
		reducer: {
			filter,
			todos
		}
	});
}
