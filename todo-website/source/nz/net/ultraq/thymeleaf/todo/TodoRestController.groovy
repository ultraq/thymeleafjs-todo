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

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import static org.springframework.web.bind.annotation.RequestMethod.*

import javax.inject.Inject

/**
 * API/Rest methods for todo items.
 * 
 * @author Emanuel Rabina
 */
@RestController
class TodoRestController {

	@Inject
	private List<Todo> todos

	/**
	 * Create a new todo item.
	 * 
	 * @param todo
	 */
	@RequestMapping(value = '/todos', method = POST)
	ResponseEntity<Void> createTodo(@RequestBody Todo newTodo) {

		todos << newTodo

		return new ResponseEntity<Void>(new HttpHeaders(
			location: "/todos/${newTodo.id}".toURI()
		), HttpStatus.CREATED)
	}

	/**
	 * Update an existing todo item.
	 * 
	 * @param todoId
	 * @param todo
	 */
	@RequestMapping(value = '/todos/{todoId}', method = PUT)
	@ResponseStatus(HttpStatus.OK)
	ResponseEntity<Void> updateTodo(@PathVariable String todoId, @RequestBody Todo updatedTodo) {

		def todo = todos.find { todo -> todo.id == todoId }
		todo.value  = updatedTodo.value
		todo.status = updatedTodo.status

		return new ResponseEntity<Void>(HttpStatus.OK)
	}
}
