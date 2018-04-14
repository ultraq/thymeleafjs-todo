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

import nz.net.ultraq.thymeleaf.todo.models.Todo
import static nz.net.ultraq.thymeleaf.todo.models.Status.*

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean

/**
 * Configuration and starting point for the ThymeleafJS TodoMVC example app.
 * 
 * @author Emanuel Rabina
 */
@SpringBootApplication
class TodoApplication {

	/**
	 * Run the website as Spring Boot application!
	 * 
	 * @param args
	 */
	static void main(String[] args) {

		SpringApplication.run(TodoApplication, args)
	}

	/**
	 * Our "in-memory database" of todo items.
	 * 
	 * @return List of hard-coded todo items.
	 */
	@Bean
	List<Todo> todos() {

		return [
			new Todo('Create a JavaScript version of Thymeleaf', COMPLETED),
			new Todo('Write an Express integration module', COMPLETED),
			new Todo('Make an example app for "ThymeleafJS"'),
			new Todo('Mention said example app... somewhere')
		]
	}
}
