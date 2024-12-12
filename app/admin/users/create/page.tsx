'use client';

import { debounce } from 'lodash'
import { UserProfile } from '@/database/types';
import { profileType, registerReason, userType } from '@/lib/constants';
import { Create, useForm } from '@refinedev/antd';

import { Form, Input, Select } from 'antd';

export default function CreateUserProfile() {
  const { formProps, saveButtonProps } = useForm<UserProfile>();
  const toSelectOptions = (items: string[] | number[]) => items.map((item) => ({ label: item, value: item }));

  const checkEmail = debounce(async (value, resolve, reject) => {
    const response = await fetch(`/api/check-email?email=${value}`);
    const data = await response.json();
  
    if (data.exists) {
      reject(new Error('Email already exists'));
    } else {
      resolve();
    }
  }, 300); // 300ms debounce time

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout='vertical' initialValues={{ role: 'user' }}>
        <Form.Item
          label='Name'
          name='name'
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
          name='email'
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
          label='Password'
          name='password'
          rules={[
            {
              required: true,
            },
            {
              min: 8,
              message: 'Password must be at least 8 characters',
            },
            {
              max: 32,
              message: 'Password must be at most 32 characters',
            },
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='Confirm Password'
          name='passwordConfirm'
          dependencies={['password']}
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The confirm password that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input type='password' />
        </Form.Item>
        <Form.Item
          label='Role'
          name='role'
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
          name='profileType'
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
          name='userType'
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
          name='experienceLevel'
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
          name='registrationReason'
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
    </Create>
  );
}
