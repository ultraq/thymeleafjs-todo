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

package nz.net.ultraq.thymeleaf.todo

import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import static nz.net.ultraq.thymeleaf.todo.Status.*

import org.springframework.web.bind.annotation.ResponseStatus
import static org.springframework.web.bind.annotation.RequestMethod.*

/**
 * Controller for the TodoMVC app.  For this example app, this is the only
 * 'layer' there is - no services, repositories, databases, etc.  All the
 * server-side app logic is in here.
 * 
 * @author Emanuel Rabina
 */
@Controller
class TodoController {

	private List<Todo> todos = [
		new Todo('Create a JavaScript version of Thymeleaf', COMPLETED),
		new Todo('Write an Express integration module', COMPLETED),
		new Todo('Make an example app for "Thymeleaf JS"'),
		new Todo('Mention said example app... somewhere')
	]

	/**
	 * Serve the single-page app.  Renders the initial view on the server.  Any
	 * modifications are then done client-side using Thymeleaf JS.
	 * 
	 * @param model
	 * @return {@code index} template.
	 */
	@RequestMapping(value = '/', method = GET)
	String index(Model model) {

		model.addAttribute('todos', todos)
		model.addAttribute('activeTodos', todos.findAll { todo -> todo.status == ACTIVE })
		model.addAttribute('completedTodos', todos.findAll { todo -> todo.status == COMPLETED })
		return 'index'
	}

	/**
	 * Update an existing todo item.
	 * 
	 * @param todoId
	 * @param todo
	 */
	@RequestMapping(value = '/todo/{todoId}', method = PATCH)
	@ResponseStatus(HttpStatus.OK)
	void updateTodo(@PathVariable String todoId, @RequestBody Todo updatedTodo) {

		def todo = todos.find { todo -> todo.id == todoId }
		todo.value  = updatedTodo.value
		todo.status = updatedTodo.status
	}
}
