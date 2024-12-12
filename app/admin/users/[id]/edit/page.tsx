'use client';

import { debounce } from 'lodash'
import { UserProfile } from '@/database/types';
import { profileType, registerReason, userType } from '@/lib/constants';
import { Edit, useForm } from '@refinedev/antd';

import { Form, Input, Select } from 'antd';

export default function UpdateUserProfile() {
  const { formProps, saveButtonProps, queryResult } = useForm<UserProfile>({
    warnWhenUnsavedChanges: true
  });
  const postData = queryResult?.data?.data;
  const initialEmail = postData?.user?.email;

  const toSelectOptions = (items: string[] | number[]) => items.map((item) => ({ label: item, value: item }));

  const checkEmail = debounce(async (value, resolve, reject) => {
    if (value === initialEmail) {
      resolve();
    } else {
      const response = await fetch(`/api/check-email?email=${value}`);
      const data = await response.json();

      if (data.exists) {
        reject(new Error('Email already exists'));
      } else {
        resolve();
      }
  }
  }, 300); // 300ms debounce time

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical'>
        <Form.Item
          label='Name'
          name={['user', 'name']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name={['user', 'email']}
          rules={[
            {
              required: true,
            },
            {
              type: 'email',
              message: 'Please enter a valid email',
            },
            {
              validator: (_, value) => {
                return new Promise((resolve, reject) => {
                  checkEmail(value, resolve, reject);
                });
              },
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Role'
          name={['user','role']}
        >
          <Select
            options={[
              {
                label: 'User',
                value: 'user',
              },
              {
                label: 'Admin',
                value: 'admin',
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label='Profile Type'
          name={['profile', 'profileType']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={toSelectOptions(profileType)}
          />
        </Form.Item>
        <Form.Item
          label='UserType'
          name={['profile', 'userType']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={toSelectOptions(userType)}
          />
        </Form.Item>
        <Form.Item
          label='Experience Level'
          name={['profile', 'experienceLevel']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={toSelectOptions([1, 2, 3, 4, 5])}
          />
        </Form.Item>
        <Form.Item
          label='Registration Reason'
          name={['profile', 'registerReason']}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={toSelectOptions(registerReason)}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}
