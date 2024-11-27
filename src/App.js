import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { Layout } from "antd";
import SiderMenu from "./components/SiderMenu";
import Maintenance from "./components/Maintenance";
import AmenityReservation from "./components/AmenityReservation";
import PackageTracker from "./components/PackageTracker";
import ChatThread from "./components/ChatThread";

const { Sider, Content } = Layout;

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible theme="dark" width={250}>
          <SiderMenu onSelect={setSelectedMenu} />
        </Sider>
        <Layout>
          <Content style={{ padding: "24px" }}>
            {selectedMenu === "maintenance" && <Maintenance />}
            {selectedMenu === "amenityReservation" && <AmenityReservation />}
            {selectedMenu === "packageTracker" && <PackageTracker />}
            {selectedMenu === "chat" && <ChatThread />}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
