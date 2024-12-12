'use client';

import Datepicker from '@/components/ui/datepicker';
import { PlatformUpdate } from '@/database/types';
import { Create, useForm } from '@refinedev/antd';

import { Form, Input, Select } from 'antd';

export default function CreatePlatformUpdate() {
  const { formProps, saveButtonProps } = useForm<PlatformUpdate>();

  const handleDateChange = (name: string) => async (date: Date | undefined) => {
    if (formProps) {
      formProps.form?.setFieldValue(name, date);
      try {
        await formProps.form?.validateFields([name]);
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Message"
          name="message"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Start Date"
          name="startDate"
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Datepicker onSelectDate={handleDateChange('startDate')} />
        </Form.Item>
        <Form.Item
          label="End Date"
          name="endDate"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || !getFieldValue('startDate') || value.getTime() > getFieldValue('startDate').getTime()) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('End Date must be later than Start Date'));
              },
            }),
          ]}
        >
          <Datepicker onSelectDate={handleDateChange('endDate')} />
        </Form.Item>
        <Form.Item
          label="Enabled"
          name="enabled"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              {
                label: 'True',
                value: true,
              },
              {
                label: 'False',
                value: false,
              },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
}
