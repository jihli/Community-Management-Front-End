import React, { useState, useEffect } from "react";
import { Layout, List, Input, Button, Typography, Alert } from "antd";

const { Sider, Content } = Layout;
const { Text } = Typography;

const ChatThread = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState(null);

  const fetchConversations = async () => {
    try {
      const response = await fetch("/api/chats?userId=1");
      if (!response.ok) {
        throw new Error(
          `Failed to fetch conversations: ${response.statusText}`
        );
      }
      const data = await response.json();
      setConversations(data);

      if (data.length > 0) {
        setCurrentChatId(data[0].conversationId);
      } else {
        setCurrentChatId(null);
      }

      setError(null);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to fetch conversations. Please ensure the backend is running."
      );
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }
      const data = await response.json();
      setError(null);
      return data;
    } catch (err) {
      console.error(err);
      setError(
        "Unable to fetch messages. Please ensure the backend is running."
      );
      return [];
    }
  };

  const sendMessage = async (chatId, content) => {
    try {
      const response = await fetch(`/api/chats/${chatId || "new"}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: 1, content }),
      });
      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }
      const data = await response.json();
      setError(null);
      return data;
    } catch (err) {
      console.error(err);
      setError("Unable to send message. Please ensure the backend is running.");
      return null;
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleConversationClick = async (chatId) => {
    setCurrentChatId(chatId);
    const messages = await fetchMessages(chatId);
    setConversations((prev) =>
      prev.map((chat) =>
        chat.conversationId === chatId ? { ...chat, messages } : chat
      )
    );
  };

  const handleSendMessage = async () => {
    if (messageInput.trim()) {
      let chatId = currentChatId;

      if (!chatId) {
        const newConversation = await sendMessage(null, messageInput);
        if (newConversation) {
          chatId = newConversation.conversationId;
          setConversations((prev) => [...prev, newConversation]);
          setCurrentChatId(chatId);
        }
      } else {
        const newMessage = await sendMessage(chatId, messageInput);
        if (newMessage) {
          setConversations((prev) =>
            prev.map((chat) =>
              chat.conversationId === chatId
                ? { ...chat, messages: [...chat.messages, newMessage] }
                : chat
            )
          );
        }
      }

      setMessageInput("");
    } else {
      setError("Message cannot be empty.");
    }
  };

  const currentChat = conversations.find(
    (chat) => chat.conversationId === currentChatId
  );

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
                backgroundColor:
                  chat.conversationId === currentChatId ? "#e6f7ff" : "#fff",
              }}
              onClick={() => handleConversationClick(chat.conversationId)}
            >
              <List.Item.Meta
                title={chat.lastTimestamp || "No timestamp"}
                description={chat.lastMessage || "No messages yet"}
              />
            </List.Item>
          )}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: "16px", overflowY: "auto" }}>
          <Typography.Title level={4}>Chat with Admin</Typography.Title>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
            />
          )}

          {currentChat?.messages?.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.senderId === 1 ? "flex-end" : "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  maxWidth: "70%",
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: msg.senderId === 1 ? "#bae7ff" : "#f0f0f0",
                }}
              >
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
