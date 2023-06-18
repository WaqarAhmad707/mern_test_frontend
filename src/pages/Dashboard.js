import { Button } from "antd";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { CarOutlined, OrderedListOutlined } from "@ant-design/icons";

const Dashboard = () => {
  const { cars, setCars, setCategories } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    let config1 = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/car/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config1)
      .then((response) => {
        setCars(response.data.cars);
      })
      .catch((error) => {
        console.log(error);
      });

    let config2 = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/category/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config2)
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: 900,
          fontSize: 74,
          fontWeight: "bold",
          fontFamily: "monospace",
          marginTop: 50,
          padding: 20,
          border: "1px solid black",
          borderRadius: 20,
        }}
      >
        Registered Cars: {cars.length}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        <Button
          type="primary"
          style={{
            margin: 10,
            height: "auto",
            width: 200,
            fontSize: 24,
          }}
          onClick={() => navigate("/cars")}
        >
          <CarOutlined />
          Cars
        </Button>
        <Button
          type="primary"
          style={{
            margin: 10,
            height: "auto",
            width: 200,
            fontSize: 24,
          }}
          onClick={() => navigate("/categories")}
        >
          <OrderedListOutlined />
          Categories
        </Button>
      </div>
    </div>
  );
};
export default Dashboard;
