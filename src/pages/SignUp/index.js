import React from "react";
import { FormOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  // getting global data using context
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  // function calls on Signup
  const onFinish = (values) => {
    let data = JSON.stringify({
      name: values.username,
      email: values.email,
    });

    let config = {
      method: "post",
      url: "http://localhost:3001/auth/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        api.success({
          message: `Account Registered Successfully`,
          description: "Check your email for password",
          placement: "topRight",
          duration: 2,
        });
      })
      .catch((error) => {
        console.log(error);
        api.error({
          message: error.response.data.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 3,
        });
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "25vh",
      }}
    >
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<FormOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item>
          <Button type="link" onClick={() => navigate("/")}>
            Log in
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
