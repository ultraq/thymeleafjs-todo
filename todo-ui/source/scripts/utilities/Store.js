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
 * Observe the store for changes.  Taken from
 * https://github.com/reactjs/redux/issues/303#issuecomment-125184409
 * 
 * @param {Object} store
 * @param {Function} select
 * @param {Function} onChange
 * @return {Function}
 */
export function observeStore(store, select, onChange) {

	let currentState;

	function handleChange() {
		let nextState = select(store.getState());
		if (nextState !== currentState) {
			currentState = nextState;
			onChange(currentState);
		}
	}

	let unsubscribe = store.subscribe(handleChange);
	handleChange();
	return unsubscribe;
}

