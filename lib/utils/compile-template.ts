import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { EmailTemplateContext, EmailTemplateName } from "../types/email.type";

// Function to compile Handlebars templates
export const compileTemplate = <T extends EmailTemplateName>(
  templateName: T,
  context: EmailTemplateContext[T]
): string => {
  const templatePath = path.resolve(
    process.cwd(),
    'lib',
    'templates',
    `${templateName}.template.hbs`
  );
  const templateSource = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(templateSource);
  return template(context);
};