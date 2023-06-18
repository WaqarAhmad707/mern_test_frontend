import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import "./Layout.css";
const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logOut } = useContext(AppContext);
  const token = localStorage.getItem("token");

  return (
    <Layout className="layout">
      <Header className="header">
        <div>
          <h1 onClick={() => navigate("/")} className="title">
            RopStam
          </h1>
          {token && (
            <Button
              onClick={() => {
                navigate("/");
                logOut();
              }}
              style={{
                cursor: "pointer",
                position: "absolute",
                right: 10,
                top: 15,
              }}
            >
              Logout
            </Button>
          )}
        </div>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>

      <Footer className="footer">
        RopStam Assessment Test - <strong>WAQAR AHMAD</strong>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
