import React, { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const SignIn = () => {
  const [api, contextHolder] = notification.useNotification();
  const { login } = useContext(AppContext);

  const onFinish = (values) => {
    let data = JSON.stringify({
      email: values.email,
      password: values.password,
    });

    let config = {
      method: "post",
      url: "http://localhost:3001/auth/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        api.success({
          message: `Logged-in Successfully`,
          placement: "topRight",
          duration: 2,
        });
        login(response.data.token)
      })
      .catch((error) => {
        console.log(error);
        api.error({
          message: error?.response?.data?.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 3,
        });
      });
  };

  const navigate = useNavigate();

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
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Button type="link" onClick={() => navigate("/signup")}>
            Register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
