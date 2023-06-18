import { Button, Form, Input, Space, Table, Tag, notification } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppContext";
import WModal from "../../components/WModal";
import WSelect from "../../components/WSelect";
import "./index.css";

const Cars = () => {
  // getting global data using context
  const { cars, setCars } = useContext(AppContext);

  // using antd notification for alerts
  const [api, contextHolder] = notification.useNotification();

  // component states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [category, setCategory] = useState(null);
  const [model, setModel] = useState(null);
  const [make, setMake] = useState(null);
  const [color, setColor] = useState(null);
  const [registrationNo, setRegistrationNo] = useState(null);

  // using form for access it fields
  const [form] = Form.useForm();

  // data table columns
  const columns = [
    {
      title: "Registration#",
      dataIndex: "registrationNo",
      key: "registrationNo",
      sorter: (a, b) => a.registrationNo - b.registrationNo,
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      sorter: (a, b) => a.color.length - b.color.length,
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      sorter: (a, b) => a.model.length - b.model.length,
    },
    {
      title: "Make",
      dataIndex: "make",
      key: "make",
      sorter: (a, b) => a.make.length - b.make.length,
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      render: (category) => {
        let color = "geekblue";
        if (category?.name === "Sedan") {
          color = "green";
        } else if (category?.name === "SUV") {
          color = "volcano";
        } else {
          color = "orange";
        }
        return (
          <Tag color={color} key={category?.name}>
            {category?.name.toUpperCase() || "N/A"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onEditButtonClick(record)}>
            <EditOutlined />
          </Button>
          <Button danger onClick={() => onDeleteAPICall(record._id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  // function to clear all fields
  const clearAllFields = () => {
    setCategory(null);
    setColor(null);
    setMake(null);
    setRegistrationNo(null);
    setModel(null);
    form.resetFields();
  };

  // function calls on Add button
  const onAddButtonClick = () => {
    setIsEdit(false);
    setIsModalOpen(true);
    clearAllFields();
  };

  // function calls Add API
  const onAddAPICall = (values) => {
    let data = JSON.stringify({
      category: values.category,
      color: values.color,
      model: values.model,
      make: values.make,
      registrationNo: values.registrationNo,
    });

    let config = {
      method: "post",
      url: "http://localhost:3001/car/",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        api.success({
          message: `Car Added Successfully`,
          placement: "topRight",
          duration: 1,
        });
        setCars([...cars, response.data.car]);
        setIsModalOpen(false);
        clearAllFields();
      })
      .catch((error) => {
        console.log(error);
        api.error({
          message: error?.response?.data?.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 2,
        });
      });
  };

  // function that access selected category
  const onChangeCategory = (value) => {
    setCategory(value);
  };

  // function calls on Edit button
  const onEditButtonClick = (value) => {
    setSelectedCar(value);
    setIsEdit(true);
    setIsModalOpen(true);

    setCategory(value.category?._id);
    setColor(value.color);
    setMake(value.make);
    setRegistrationNo(value.registrationNo);
    setModel(value.model);

    form.setFieldsValue({
      category: value.category?._id,
      color: value.color,
      make: value.make,
      registrationNo: value.registrationNo,
      model: value.model,
    });
  };

  // function calls Edit API
  const onEditAPICall = (record) => {
    let data = JSON.stringify({
      category: category,
      color: color,
      model: model,
      make: make,
      registrationNo: registrationNo,
    });

    let config = {
      method: "put",
      url: `http://localhost:3001/car/${selectedCar._id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        api.success({
          message: `Car updated Successfully`,
          placement: "topRight",
          duration: 1,
        });
        const index = cars.findIndex((item) => item._id === selectedCar._id);
        if (index > -1) {
          cars[index] = response.data.car;
        }
        setCars([...cars]);
        setIsEdit(false);
        setIsModalOpen(false);
        setSelectedCar(null);
        clearAllFields();
      })
      .catch((error) => {
        api.error({
          message: error?.response?.data?.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 1,
        });
      });
  };

  // function calls Delete API
  const onDeleteAPICall = (id) => {
    let config = {
      method: "delete",
      url: `http://localhost:3001/car/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        api.success({
          message: `Car deleted Successfully`,
          placement: "topRight",
          duration: 1,
        });
        const updatedRes = cars.filter((item) => item._id !== id);
        setCars([...updatedRes]);
      })
      .catch((error) => {
        api.error({
          message: error?.response?.data?.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 2,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <WModal
        isOpen={isModalOpen}
        onCancel={setIsModalOpen}
        title={isEdit ? "Edit Car" : "Add Car"}
      >
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={isEdit ? onEditAPICall : onAddAPICall}
        >
          <Form.Item
            name="category"
            rules={[{ required: true, message: "Please input your Category!" }]}
          >
            <WSelect
              placeholder={"Category"}
              category={category}
              onChange={onChangeCategory}
            />
          </Form.Item>
          <Form.Item
            name="model"
            rules={[{ required: true, message: "Please input your Model!" }]}
          >
            <Input
              placeholder="Model"
              // value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="make"
            rules={[{ required: true, message: "Please input your Make!" }]}
          >
            <Input
              placeholder="Make"
              // value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="registrationNo"
            rules={[
              { required: true, message: "Please input your Registration No!" },
            ]}
          >
            <Input
              placeholder="Registration No."
              // value={registrationNo}
              onChange={(e) => setRegistrationNo(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="color"
            rules={[{ required: true, message: "Please input your Color!" }]}
          >
            <Input
              placeholder="Color"
              // value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </Form.Item>

          <Form.Item className="add-btn">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Add Car
            </Button>
          </Form.Item>
        </Form>
      </WModal>

      <Button type="dashed" className="side-btn" onClick={onAddButtonClick}>
        Add Car
      </Button>
      <Table columns={columns} dataSource={cars} />
    </>
  );
};
export default Cars;
