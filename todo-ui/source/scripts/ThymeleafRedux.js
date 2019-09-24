/* 
 * Copyright 2019, Emanuel Rabina (http://www.ultraq.net.nz/)
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

import {observe} from '@ultraq/redux-utils';

/**
 * Link a part of the state in a Redux store as props to a Thymeleaf component.
 * 
 * @param {Function} mapStateToProps
 * @param {Object} mapDispatchToProps
 * @param {Function} Component
 * @return {Object}
 */
export function connect(mapStateToProps, mapDispatchToProps, Component) {

	/* 
	 * Wrapper class for the Thymeleaf component
	 */
	return class ConnectedThymeleafComponent {

		/* 
		 * Constructor, augments the props passed to the component with items from
		 * the Redux store and any actions, as per the arguments to connect().
		 */
		constructor(props, context) {

			let {store} = context;
			let wrappedDispatch = Object.entries(mapDispatchToProps).reduce((acc, [name, action]) => {
				acc[name] = (...args) => store.dispatch(action(...args));
				return acc;
			}, {});

			let combinedProps = {
				...props,
				...mapStateToProps(store.getState()),
				...wrappedDispatch
			};

			const component = new Component(combinedProps, context);

			// Tie re-renders to updates on the store
			observe(store, mapStateToProps, stateSlice => {
				Object.assign(component.state, stateSlice);
			});
		}
	};
}
