/* eslint-disable jsx-a11y/label-has-associated-control */
import api from '@/services/api';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './LoginForm.module.scss';

export default function LoginForm() {
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    const { email, password } = values;
    const res = await api.post('/api/register',
      {
        email,
        password,
      });

    alert(JSON.stringify(res.data));
  };

  return (
    <div className={styles.container}>
      <Form
        name="normal_login"
        className={styles['login-form']}
        initialValues={{ email: '', password: '' }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
        >
          <Input prefix={<UserOutlined className={styles['site-form-item-icon']} />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className={styles['site-form-item-icon']} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
            Log in
          </Button>

        </Form.Item>
      </Form>
    </div>

  );
}
