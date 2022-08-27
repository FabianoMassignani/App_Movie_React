import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { setNavigate } from "../store/actions/filters";
import { useDispatch, useSelector } from "react-redux";
import { PaginationBar } from "../components/Pagination";
import { HomeOutlined, BarsOutlined } from "@ant-design/icons";

export const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Header, Content, Footer, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const Filters = useSelector((state) => state.filters);
  const { optionNavigate } = Filters;

  // const onSelect = (item) => {
  //   navigate(item.key, { replace: true });
  //   dispatch(setNavigate(item.key));
  // };

  const onClick = (item) => {
    navigate(item.key, { replace: true });
    dispatch(setNavigate(item.key));
  };

  const items = [
    { label: "Inicio", key: "/", icon: <HomeOutlined /> },
    { label: "Movies", key: "/movies", icon: <BarsOutlined /> },
    { label: "Tv Shows", key: "/serials", icon: <BarsOutlined /> },
    {
      label: "Track",
      key: "submenu",
      icon: <HomeOutlined />,
      children: [
        { label: "Login", key: "/login" },
        { label: "History", key: "/history" },
      ],
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          selectedKeys={[optionNavigate]}
          //onSelect={onSelect}
          onClick={onClick}
          items={items}
          theme="dark"
          mode="vertical"
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Content
          style={{
            background: "#1a202c",
          }}
        >
          <div className="container">
            <>
              {props.children}
              {props.noPagination ? null : (
                <PaginationBar
                  total={props.total}
                  current={props.currentPage}
                />
              )}
            </>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#1a202c",
          }}
        >
          ©2021 Created by Fabiano
        </Footer>
      </Layout>
    </Layout>
  );
};
