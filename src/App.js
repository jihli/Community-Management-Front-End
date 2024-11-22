import React, { useState } from "react";
import { Layout } from "antd";
import SiderMenu from "./components/SiderMenu";
import Maintenance from "./components/Maintenance";
import AmenityReservation from "./components/AmenityReservation";

const { Sider, Content } = Layout;

function App() {
  const [selectedMenu, setSelectedMenu] = useState("maintenance");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="dark" width={250}>
        <SiderMenu onSelect={setSelectedMenu} />
      </Sider>
      <Layout>
        <Content style={{ padding: "24px" }}>
          {selectedMenu === "maintenance" && <Maintenance />}
          {selectedMenu === "amenityReservation" && <AmenityReservation />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
