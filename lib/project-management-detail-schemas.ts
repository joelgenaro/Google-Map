import { object, string, date } from 'zod';

export const insertIssueSchema = object({
  projectId: string({ required_error: 'Project ID is required' })
    .uuid()
    .min(1, 'Project ID is required')
    .trim(),
  issue: string({ required_error: 'Issue is required' })
    .min(1, 'Issue is required')
    .trim(),
  status: string({ required_error: 'Status is required' })
    .min(1, 'Status is required')
    .trim(),
  action: string().optional(),
  date: string({ required_error: 'Date is required' }).min(
    1,
    'Date is required'
  ),
  description: string().optional(),
  attachedFile: string().optional(),
});

export const insertActivitySchema = object({
  projectId: string({ required_error: 'Project ID is required' })
    .uuid()
    .min(1, 'Project ID is required')
    .trim(),
  activity: string({ required_error: 'Activity is required' })
    .min(1, 'Activity is required')
    .trim(),
  status: string({ required_error: 'Status is required' })
    .min(1, 'Status is required')
    .trim(),
  type: string().optional(),
  date: string().optional(),
  fromDate: string().optional(),
  toDate: string().optional(),
  description: string().optional(),
  attachedFile: string().optional(),
});
