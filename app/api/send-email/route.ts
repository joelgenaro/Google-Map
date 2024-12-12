import { AttachmentType, sendEmail } from '@/lib/services/email.service';
import {
  EmailTemplate,
  EmailTemplateContext,
  EmailTemplateName
} from '@/lib/types/email.type';
import { compileTemplate } from '@/lib/utils/compile-template';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const {
    to,
    subject,
    template,
  }: {
    to: string;
    subject: string;
    template: EmailTemplate<EmailTemplateName>;
  } = await request.json();

  try {
    let html: string = '';
    let attachments: AttachmentType = [];
    if (template.name === 'seed-request') {
      html = compileTemplate(
        'seed-request',
        template.context as EmailTemplateContext['seed-request']
      );
    } else if (template.name === 'land-assessment-request-report') {
      html = compileTemplate(
        'land-assessment-request-report',
        template.context as EmailTemplateContext['land-assessment-request-report']
      );
      // Read file contents asynchronously and prepare attachments
      const geojsonFiles = (template.context as EmailTemplateContext['land-assessment-request-report']).geojsonFiles;
      const projectUUID = (template.context as EmailTemplateContext['land-assessment-request-report']).projectUUID
      const attachmentPromises = geojsonFiles.map(async file => {
        try {
          const response = await fetch(file.url);
          if (!response.ok) throw new Error(`Failed to fetch ${file.url}`)
          const buffer = await response.arrayBuffer();
          const content = Buffer.from(buffer).toString('base64');
          return {
            filename: `${projectUUID}_${file.name}`,
            content: content,
            encoding: 'base64'
          };
        } catch (error) {
          console.error(`Error downloading file from ${file.url}:`, error);
          throw error;
        }
      });
      // Wait for all file contents to be read and attachments to be prepared
      attachments = await Promise.all(attachmentPromises);
    } else if (template.name === 'another-email-template') {
      html = compileTemplate(
        'another-email-template',
        template.context as EmailTemplateContext['another-email-template']
      );
    } else {
      throw new Error('Template not found');
    }
    await sendEmail({ to, subject, html, attachments });
    console.log(`Email sent successfully to ${to} with subject: ${subject}`);
    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(`Error sending email: ${(error as Error).message}`);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
