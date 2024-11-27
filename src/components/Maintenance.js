import React, { useState } from "react";
import {
  Breadcrumb,
  Tabs,
  Form,
  Input,
  DatePicker,
  Button,
  List,
  Card,
} from "antd";
import moment from "moment";

const { TabPane } = Tabs;

const Maintenance = () => {
  // State to manage the currently selected tab
  const [selectedTab, setSelectedTab] = useState("newRequest");

  // State to manage the list of maintenance requests (examples)
  const [maintenanceHistory, setMaintenanceHistory] = useState([
    { id: 1, description: "Fix kitchen sink", date: "2024-11-15" },
    { id: 2, description: "Repair air conditioner", date: "2024-10-30" },
  ]);

  // Reference to the form instance
  const [form] = Form.useForm();

  // Handle the submission of the maintenance request form
  const handleFormSubmit = (values) => {
    const { description, date } = values;

    // Create a new maintenance request object
    const newRequest = {
      id: maintenanceHistory.length + 1, // Generate a unique ID
      description,
      date: date.format("YYYY-MM-DD"), // Format the date to a readable format
    };

    // Add the new request to the history and reset the form
    setMaintenanceHistory([newRequest, ...maintenanceHistory]);
    form.resetFields();

    // Switch to the "Past Request" tab to show the updated list
    setSelectedTab("pastRequest");
  };

  // Disable dates in the date picker before the current date
  const disableDate = (current) => {
    return current && current < moment().startOf("day");
  };

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      {/* Breadcrumb navigation */}
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item style={{ color: "#aaa" }}>
          Calendar Schedule
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#000" }}>Maintenance</Breadcrumb.Item>
      </Breadcrumb>

      <h2>Maintenance</h2>

      {/* Tabs for "New Request" and "Past Request" */}
      <Tabs
        activeKey={selectedTab}
        onChange={(key) => setSelectedTab(key)}
        centered
      >
        {/* Tab for submitting a new maintenance request */}
        <TabPane tab="New Request" key="newRequest">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            {/* Input for the issue description */}
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please provide a description of the issue",
                },
              ]}
            >
              <Input.TextArea placeholder="Describe the issue..." rows={4} />
            </Form.Item>

            {/* Date picker for selecting the maintenance date */}
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Please select a date" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                disabledDate={disableDate}
              />
            </Form.Item>

            {/* Submit button */}
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        {/* Tab for viewing past maintenance requests */}
        <TabPane tab="Past Request" key="pastRequest">
          <List
            itemLayout="vertical"
            dataSource={maintenanceHistory}
            renderItem={(item) => (
              <Card style={{ marginBottom: "16px" }}>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Date:</strong> {item.date}
                </p>
              </Card>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Maintenance;
