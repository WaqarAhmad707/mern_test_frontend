import React, { useContext } from "react";
import { Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const { Header, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { logOut } = useContext(AppContext);
  const token = localStorage.getItem('token');

  return (
    <Layout
      className="layout"
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #70e1f5, #ffd194)",
      }}
    >
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" style={{ display: 'flex' }}>
          <h1
            onClick={() => navigate("/")}
            style={{
              color: "white",
              cursor: "pointer",
            }}
          >
            RopStam
          </h1>
          {
            token &&
            <Button
              onClick={()=>{navigate("/"); logOut();}}
              style={{
                // color: "white",
                cursor: "pointer",
                position: 'absolute',
                right: 10,
                top: 15
              }}
            >
              Logout
            </Button>
          }
        </div>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ height: "80vh" }}>
          {children}
        </div>
      </Content>

      <Footer
        style={{
          textAlign: "center",
          background: "linear-gradient(to right, #70e1f5, #ffd194)",
        }}
      >
        RopStam Assessment Test - <strong>WAQAR AHMAD</strong>
      </Footer>
    </Layout>
  );
};

export default MainLayout;
