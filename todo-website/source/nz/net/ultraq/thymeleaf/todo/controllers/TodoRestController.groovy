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

package nz.net.ultraq.thymeleaf.todo.controllers

import nz.net.ultraq.thymeleaf.todo.models.Todo

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

import javax.inject.Inject

/**
 * API/Rest methods for todo items.
 * 
 * @author Emanuel Rabina
 */
@RestController
class TodoRestController {

	private static final Object todosLock = new Object()

	@Inject
	private List<Todo> todos

	/**
	 * Create a new todo item.
	 * 
	 * @param todo
	 */
	@PostMapping(value = '/todos')
	ResponseEntity<Void> createTodo(@RequestBody Todo newTodo) {

		todos << newTodo

		return new ResponseEntity<Void>(new HttpHeaders(
			location: "/todos/${newTodo.id}".toURI()
		), HttpStatus.CREATED)
	}

	/**
	 * Delete a todo item.
	 */
	@DeleteMapping(value = '/todos/{todoId}')
	ResponseEntity<Void> deleteTodo(@PathVariable String todoId) {

		synchronized (todosLock) {
			if (todos.removeAll { todo -> todo.id == todoId }) {
				return new ResponseEntity<Void>(HttpStatus.OK)
			}
			return new ResponseEntity<Void>(HttpStatus.NOT_FOUND)
		}
	}

	/**
	 * Update an existing todo item.
	 * 
	 * @param todoId
	 * @param todo
	 */
	@PutMapping(value = '/todos/{todoId}')
	ResponseEntity<Void> updateTodo(@PathVariable String todoId, @RequestBody Todo updatedTodo) {

		def todo = todos.find { todo -> todo.id == todoId }
		if (todo) {
			todo.value  = updatedTodo.value
			todo.status = updatedTodo.status
			return new ResponseEntity<Void>(HttpStatus.OK)
		}
		return new ResponseEntity<Void>(HttpStatus.NOT_FOUND)
	}
}
