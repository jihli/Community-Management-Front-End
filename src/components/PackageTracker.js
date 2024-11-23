import React, { useState } from "react";
import { Breadcrumb, Card, Button, List, Tabs } from "antd";

const { TabPane } = Tabs;

// Mock data for packages
const initialPackages = [
  { id: 1, code: "PKG123", location: "Shelf A" },
  { id: 2, code: "PKG456", location: "Shelf B" },
  { id: 3, code: "PKG789", location: "Shelf C" },
];

const PackageTracker = () => {
  const [newPackages, setNewPackages] = useState(initialPackages); // 未取包裹
  const [historyPackages, setHistoryPackages] = useState([]); // 已取包裹

  const handlePickedUp = (packageId) => {
    const pickedPackage = newPackages.find((pkg) => pkg.id === packageId);
    if (pickedPackage) {
      setNewPackages(newPackages.filter((pkg) => pkg.id !== packageId)); // 从新包裹中移除
      setHistoryPackages([...historyPackages, pickedPackage]); // 添加到历史记录
    }
  };

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item style={{ color: "#aaa" }}>
          Community Management
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#000" }}>
          Package Tracker
        </Breadcrumb.Item>
      </Breadcrumb>

      <h2>Package Tracker</h2>

      <Tabs defaultActiveKey="1">
        {/* New Arrivals Tab */}
        <TabPane tab="New Arrivals" key="1">
          {newPackages.length === 0 ? (
            <p style={{ textAlign: "center" }}>No new packages available.</p>
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={newPackages}
              renderItem={(pkg) => (
                <List.Item>
                  <Card
                    title={`Package #${pkg.id}`}
                    extra={`Location: ${pkg.location}`}
                    style={{ border: "1px solid #d9d9d9" }}
                  >
                    <p>
                      Pickup Code: <strong>{pkg.code}</strong>
                    </p>
                    <Button
                      type="primary"
                      onClick={() => handlePickedUp(pkg.id)}
                    >
                      I have picked up
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </TabPane>

        {/* History Packages Tab */}
        <TabPane tab="History Packages" key="2">
          {historyPackages.length === 0 ? (
            <p style={{ textAlign: "center" }}>No packages in history.</p>
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={historyPackages}
              renderItem={(pkg) => (
                <List.Item>
                  <Card
                    title={`Package #${pkg.id}`}
                    extra={`Location: ${pkg.location}`}
                    style={{ border: "1px solid #d9d9d9" }}
                  >
                    <p>
                      Pickup Code: <strong>{pkg.code}</strong>
                    </p>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PackageTracker;
