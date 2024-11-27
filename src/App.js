import React, { useState } from "react";
import { Layout } from "antd";
import SiderMenu from "./components/SiderMenu";
import Maintenance from "./components/Maintenance";
import AmenityReservation from "./components/AmenityReservation";
import PackageTracker from "./components/PackageTracker";
import ChatThread from "./components/ChatThread";
import Notice from "./components/Notice";
import Discussion from "./components/Discussion";
import PostDetails from "./components/PostDetails";

const { Sider, Content } = Layout;

function App() {
  const [selectedMenu, setSelectedMenu] = useState("maintenance");
  const [currentPostId, setCurrentPostId] = useState(null);

  const handleShowPostDetails = (postId) => {
    setCurrentPostId(postId);
    setSelectedMenu("postDetails");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible theme="dark" width={250}>
        <SiderMenu onSelect={setSelectedMenu} />
      </Sider>
      <Layout>
        <Content style={{ padding: "24px" }}>
          {selectedMenu === "maintenance" && <Maintenance />}
          {selectedMenu === "notice" && (
            <Notice onPostSelect={handleShowPostDetails} />
          )}
          {selectedMenu === "discussion" && (
            <Discussion onPostSelect={handleShowPostDetails} />
          )}
          {selectedMenu === "postDetails" && (
            <PostDetails postId={currentPostId} />
          )}
          {selectedMenu === "amenityReservation" && <AmenityReservation />}
          {selectedMenu === "packageTracker" && <PackageTracker />}
          {selectedMenu === "chat" && <ChatThread />}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
