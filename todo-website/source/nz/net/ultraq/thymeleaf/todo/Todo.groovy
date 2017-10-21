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

import static nz.net.ultraq.thymeleaf.todo.Status.*

/**
 * A to-do item.
 * 
 * @author Emanuel Rabina
 */
class Todo {

	final String id
	String value
	Status status = ACTIVE

	/**
	 * Constructor, an empty todo item.
	 */
	Todo() {

		this(null)
	}

	/**
	 * Constructor, generate a unique ID for the todo item.
	 * 
	 * @param value
	 * @param status
	 */
	Todo(String value, Status status = ACTIVE) {

		this.id     = UUID.randomUUID().toString()
		this.value  = value
		this.status = status
	}

	/**
	 * Return whether this todo has the {@code COMPLETED} status.
	 * 
	 * @return {@code true} if the status is {@code COMPLETED}.
	 */
	boolean isCompleted() {

		return status == COMPLETED
	}
}
