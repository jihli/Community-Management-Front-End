import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import { Card, Input, Button, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Notice = ({ onPostSelect }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts("notice").then(setPosts);
  }, []);

  return (
    <div>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          width: "100%",
          padding: "10px",
          position: "relative",
        }}
      >
        {posts[0] ? (
          <Card
            title={posts[0].title}
            style={{ marginBottom: "20px", height: "600px", overflowY: "auto" }}
          >
            <p>{posts[0].content}</p>
            <p>
              <small>{posts[0].date}</small>
            </p>
          </Card>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          width: "100%",
          padding: "10px",
          position: "relative",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Past Notices
        </span>
        <ul>
          {posts.map((post, index) => (
            <React.Fragment key={post.id}>
              <li
                onClick={() => onPostSelect(post.id)}
                style={{
                  cursor: "pointer",
                  height: "20px", // Consistent height for visible items
                }}
              >
                {post.title}
              </li>
              <li
                style={{
                  height: "20px", // Height for the spacer item
                  listStyleType: "none", // Remove the bullet point for visual clarity
                }}
              >
                {/* This is an empty list item used as a spacer */}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notice;
