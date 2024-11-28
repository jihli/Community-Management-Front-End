import React, { useState } from "react";
import { Layout } from "antd";
import SiderMenu from "./components/SiderMenu";
import Maintenance from "./components/Maintenance";
import AmenityReservation from "./components/AmenityReservation";
import PackageTracker from "./components/PackageTracker";
import ChatThread from "./components/ChatThread";

const { Sider, Content } = Layout;

function App() {
  const [selectedMenu, setSelectedMenu] = useState("maintenance");
  const userId = 2; // 假设用户ID

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="dark" width={250}>
        <SiderMenu onSelect={setSelectedMenu} />
      </Sider>
      <Layout>
        <Content style={{ padding: "24px" }}>
          {selectedMenu === "maintenance" && <Maintenance userId={userId} />}
          {selectedMenu === "amenityReservation" && (
            <AmenityReservation userId={userId} />
          )}
          {selectedMenu === "packageTracker" && <PackageTracker />}
          {selectedMenu === "chat" && <ChatThread />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
