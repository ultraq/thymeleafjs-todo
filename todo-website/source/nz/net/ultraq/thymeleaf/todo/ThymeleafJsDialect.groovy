/* 
 * Copyright 2020, Emanuel Rabina (http://www.ultraq.net.nz/)
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

import org.thymeleaf.dialect.AbstractProcessorDialect
import org.thymeleaf.processor.IProcessor
import org.thymeleaf.standard.processor.StandardXmlNsTagProcessor
import org.thymeleaf.templatemode.TemplateMode

/**
 * A dialect whose only job is to remove {@code thjs:} entries from the DOM so
 * that they aren't visible in the rendered output.
 * 
 * @author Emanuel Rabina
 */
class ThymeleafJsDialect extends AbstractProcessorDialect {

	static final String NAME = 'ThymeleafJS'
	static final String PREFIX = 'thjs'
	static final int PRECEDENCE = 2000

	/**
	 * Constructor, set the name and prefix of this dialect.
	 */
	ThymeleafJsDialect() {

		super(NAME, PREFIX, PRECEDENCE)
	}

	@Override
	Set<IProcessor> getProcessors(String dialectPrefix) {

		return [
		  new StandardXmlNsTagProcessor(TemplateMode.HTML, dialectPrefix),
			new ThymeleafJsProcessor(TemplateMode.HTML, dialectPrefix, 'if'),
			new ThymeleafJsProcessor(TemplateMode.HTML, dialectPrefix, 'text'),
		]
	}
}
