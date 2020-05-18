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

import TodoFooter  from './components/TodoFooter.js';
import TodoList    from './components/TodoList.js';
import {setFilter} from './reducers/filter.js';
import {
	ACTIVE_FILTER,
	COMPLETED_FILTER, filterTodos,
	NO_FILTER
}                  from './utilities/Filters.js';

import {observe} from '@ultraq/redux-utils';
import {Router}  from 'director/build/director';

/**
 * Overall controller of the TodoMVC app.
 * 
 * @author Emanuel Rabina
 */
export default class TodoApp {

	/**
	 * Start the app with the given redux store that contains the initial state of
	 * todo items on the page.
	 * 
	 * @param {Store} store
	 * @param {TemplateEngine} templateEngine
	 */
	constructor(store, templateEngine) {

		let todoList = new TodoList(store);
		let todoFooter = new TodoFooter(store);

		// Redraw the list on change
		observe(store, state => state, state => {
			let context = {
				filter: state.filter,
				todos: filterTodos(state.todos, state.filter),
				allTodos: state.todos,
				activeTodos: filterTodos(state.todos, ACTIVE_FILTER),
				completedTodos: filterTodos(state.todos, COMPLETED_FILTER)
			};
			todoList.render(templateEngine, context);
			todoFooter.render(templateEngine, context);
		});

		// Routing to filter the list
		let router = new Router({
			'/':          () => store.dispatch(setFilter(NO_FILTER)),
			'/active':    () => store.dispatch(setFilter(ACTIVE_FILTER)),
			'/completed': () => store.dispatch(setFilter(COMPLETED_FILTER))
		});
		router.init();
	}
}
