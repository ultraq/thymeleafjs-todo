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

import org.thymeleaf.context.ITemplateContext
import org.thymeleaf.engine.AttributeName
import org.thymeleaf.model.IProcessableElementTag
import org.thymeleaf.processor.element.AbstractAttributeTagProcessor
import org.thymeleaf.processor.element.IElementTagStructureHandler
import org.thymeleaf.templatemode.TemplateMode

/**
 * A processor that only removes the attribute it is configured for.
 * 
 * @author Emanuel Rabina
 */
class ThymeleafJsProcessor extends AbstractAttributeTagProcessor {

	static final int PRECEDENCE = 1000

	/**
	 * Constructor, set this processor to work on the given attribute.
	 * 
	 * @param templateMode
	 * @param dialectPrefix
	 * @param attributeName
	 */
	protected ThymeleafJsProcessor(TemplateMode templateMode, String dialectPrefix, String attributeName) {

		super(templateMode, dialectPrefix, null, false, attributeName, true, PRECEDENCE, true)
	}

	/**
	 * Does nothing.
	 * 
	 * @param context
	 * @param tag
	 * @param attributeName
	 * @param attributeValue
	 * @param structureHandler
	 */
	@Override
	protected void doProcess(ITemplateContext context, IProcessableElementTag tag, AttributeName attributeName,
		String attributeValue, IElementTagStructureHandler structureHandler) {
	}
}
