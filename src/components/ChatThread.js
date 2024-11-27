import React, { useState } from "react";
import { Layout, List, Input, Button, Typography } from "antd";

const { Sider, Content } = Layout;
const { Text } = Typography;

const ChatThread = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      messages: [
        { sender: "Admin", content: "Welcome!", timestamp: "2024-11-26 14:30" },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const currentChat = conversations.find((chat) => chat.id === currentChatId);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    sender: "You",
                    content: messageInput,
                    timestamp: new Date().toLocaleString(),
                  },
                ],
              }
            : chat
        )
      );
      setMessageInput("");
    }
  };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider
        width={300}
        theme="light"
        style={{ borderRight: "1px solid #f0f0f0" }}
      >
        <div style={{ padding: "16px", background: "#fff" }}>
          <Text strong style={{ fontSize: 18 }}>
            Conversations
          </Text>
        </div>
        <List
          dataSource={conversations}
          renderItem={(chat) => (
            <List.Item
              style={{
                cursor: "pointer",
                backgroundColor: chat.id === currentChatId ? "#e6f7ff" : "#fff",
              }}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <List.Item.Meta
                title={chat.messages.at(-1)?.timestamp || "No timestamp"}
                description={chat.messages.at(-1)?.content || "No messages yet"}
              />
            </List.Item>
          )}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: "16px", overflowY: "auto" }}>
          <Typography.Title level={4}>Chat with Admin</Typography.Title>
          {currentChat?.messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "You" ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: msg.sender === "You" ? "#bae7ff" : "#f0f0f0",
                }}
              >
                <div style={{ fontWeight: "bold" }}>{msg.sender}</div>
                <div>{msg.content}</div>
                <div
                  style={{ fontSize: 12, color: "#888", textAlign: "right" }}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </Content>

        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #f0f0f0",
            background: "#fff",
          }}
        >
          <Input.Group compact>
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              style={{ width: "calc(100% - 100px)" }}
            />
            <Button type="primary" onClick={handleSendMessage}>
              Send
            </Button>
          </Input.Group>
        </div>
      </Layout>
    </Layout>
  );
};

export default ChatThread;
