import { env } from '@/env';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(env.SENDGRID_API_KEY);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: AttachmentType;
}

export type AttachmentType = Array<{
  filename: string;
  content: string;
  type?: string;
  disposition?: 'inline' | 'attachment';
  content_id?: string;
  encoding?: string;
}> 

export const sendEmail = async (emailOptions: EmailOptions) => {
  const emailMsg = {
    to: emailOptions.to,
    from: env.EMAIL_FROM,
    subject: emailOptions.subject,
    html: emailOptions.html,
    attachments: emailOptions.attachments || [],
  };

  try {
    await sgMail.send(emailMsg);
  } catch (error) {
    throw error;
  }
};
