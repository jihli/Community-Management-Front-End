import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Tabs,
  Form,
  Input,
  DatePicker,
  Button,
  List,
  Card,
  message,
} from "antd";
import moment from "moment";
import { MaintenanceRequestsAPI } from "../utils";

const { TabPane } = Tabs;

const Maintenance = ({ userId }) => {
  const [selectedTab, setSelectedTab] = useState("newRequest");
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const history = await MaintenanceRequestsAPI.getRequests(userId);
        setMaintenanceHistory(history);
      } catch (error) {
        message.error("Failed to load maintenance history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  const handleFormSubmit = async (values) => {
    const { description, date } = values;
    const formattedDate = moment(date).format("YYYY-MM-DD");
    try {
      await MaintenanceRequestsAPI.createRequest(
        userId,
        description,
        formattedDate
      );
      message.success("Maintenance request submitted successfully!");
      form.resetFields();
      setSelectedTab("pastRequest");

      // 直接更新本地维护的历史记录，而不是重新请求API
      const newRequest = { description, requestDate: formattedDate };
      setMaintenanceHistory([newRequest, ...maintenanceHistory]); // 将新请求添加到历史记录中
    } catch (error) {
      message.error("Failed to submit maintenance request.");
    }
  };

  const disableDate = (current) => current && current < moment().startOf("day");

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item style={{ color: "#aaa" }}>
          Calendar Schedule
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#000" }}>Maintenance</Breadcrumb.Item>
      </Breadcrumb>

      <h2>Maintenance</h2>

      <Tabs
        activeKey={selectedTab}
        onChange={(key) => setSelectedTab(key)}
        centered
      >
        <TabPane tab="New Request" key="newRequest">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
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
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Submit Request
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Past Request" key="pastRequest">
          <List
            itemLayout="vertical"
            dataSource={maintenanceHistory}
            loading={loading}
            renderItem={(item) => (
              <Card style={{ marginBottom: "16px" }}>
                <p>
                  <strong>Description:</strong> {item.description}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {moment(item.requestDate).format("YYYY-MM-DD")}
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
