import { Button } from "antd";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { CarOutlined, OrderedListOutlined } from "@ant-design/icons";
import "./index.css";

const Dashboard = () => {
  // getting global data using context
  const { cars, setCars, setCategories } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // calling get all cars API
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

    // calling get all categories API
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
    <div>
      <div className="counter">Registered Cars: {cars.length}</div>

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
          className="btns"
          onClick={() => navigate("/cars")}
        >
          <CarOutlined />
          Cars
        </Button>
        <Button
          type="primary"
          className="btns"
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
