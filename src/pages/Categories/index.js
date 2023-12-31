import { Button, Input, Space, Table, notification } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { AppContext } from "../../context/AppContext";
import "./index.css";

const Categories = () => {
  // getting global data using context
  const { categories, setCategories } = useContext(AppContext);

  // component states
  const [category, setCategory] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updateCategory, setUpdateCategory] = useState(null);

  // using antd notification for alerts
  const [api, contextHolder] = notification.useNotification();

  // data table columns
  const columns = [
    {
      title: "ID#",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => onEditButtonClick(record)}>
            <EditOutlined />
          </Button>
          <Button danger onClick={() => onDelete(record._id)}>
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  // function calls Add API
  const onAddAPI = () => {
    let data = JSON.stringify({
      name: category,
    });

    let config = {
      method: "post",
      url: "http://localhost:3001/category/",
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
          message: `Category added Successfully`,
          placement: "topRight",
          duration: 2,
        });
        setCategories([...categories, response.data.category]);
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

  // function calls on Edit button
  const onEditButtonClick = (record) => {
    setIsEdit(true);
    setUpdateCategory(record.name);
    setSelectedCategory(record);
  };

  // function calls Edit API
  const onEditAPI = (record) => {
    let data = JSON.stringify({
      name: updateCategory,
    });

    let config = {
      method: "put",
      url: `http://localhost:3001/category/${record._id}`,
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
          message: `Category updated Successfully`,
          placement: "topRight",
          duration: 2,
        });
        const index = categories.findIndex((item) => item._id === record._id);
        if (index > -1) {
          categories[index] = response.data.category;
        }
        setCategories([...categories]);
        setIsEdit(false);
        setSelectedCategory(null);
        setUpdateCategory(null);
      })
      .catch((error) => {
        api.error({
          message: error?.response?.data?.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 3,
        });
      });
  };

  // function calls Delete API
  const onDelete = (id) => {
    let config = {
      method: "delete",
      url: `http://localhost:3001/category/${id}`,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        api.success({
          message: `Category deleted Successfully`,
          placement: "topRight",
          duration: 2,
        });
        const updatedRes = categories.filter((item) => item._id !== id);
        setCategories([...updatedRes]);
      })
      .catch((error) => {
        api.error({
          message: error?.response?.data?.message,
          description: "Try Again...",
          placement: "topRight",
          duration: 3,
        });
      });
  };

  return (
    <>
      {contextHolder}
      <div className="container">
        <Input
          placeholder={"Category Name"}
          className="category-input"
          value={isEdit ? updateCategory : category}
          onChange={(e) =>
            isEdit
              ? setUpdateCategory(e.target.value)
              : setCategory(e.target.value)
          }
        />
        <Button
          type="dashed"
          className="btn"
          onClick={() => (isEdit ? onEditAPI(selectedCategory) : onAddAPI())}
        >
          {isEdit ? "Update Category" : "Add Category"}
        </Button>
      </div>
      <Table columns={columns} dataSource={categories} />
    </>
  );
};
export default Categories;
