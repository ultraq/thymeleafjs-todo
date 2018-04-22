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

import {observeStore} from './Store';
import applyFilter, {
	ACTIVE_FILTER,
	COMPLETED_FILTER,
	NO_FILTER}          from './actions/applyFilter';
import TodoFooter     from './components/TodoFooter';
import TodoList       from './components/TodoList';

import {Router} from 'director/build/director';

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
		observeStore(store, state => state, context => {
			todoList.render(templateEngine, context);
			todoFooter.render(templateEngine, context);
		});

		// Routing to filter the list
		let router = new Router({
			'/':          () => store.dispatch(applyFilter(NO_FILTER)),
			'/active':    () => store.dispatch(applyFilter(ACTIVE_FILTER)),
			'/completed': () => store.dispatch(applyFilter(COMPLETED_FILTER))
		});
		router.init();
	}
}
