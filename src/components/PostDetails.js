import React, { useEffect, useState } from "react";
import { fetchPostById } from "../api";
import { Card, Input, Button, Comment, Avatar, Form, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetchPostById(postId).then(setPost);
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    console.log("Comment posted:", comment); // This is just a placeholder
    setComment(""); // Clear input after "posting"
  };

  return (
    <div style={{ padding: "20px" }}>
      {post ? (
        <Card title={post.title} style={{ width: "100%" }}>
          <p>{post.content}</p>
          <p>
            <small>{post.date}</small>
          </p>
          <Button
            icon={<UserOutlined />}
            style={{ position: "absolute", right: "10px", bottom: "10px" }}
          >
            Comment
          </Button>
        </Card>
      ) : (
        <p>Loading...</p>
      )}
      <Form style={{ marginTop: "20px" }}>
        <Form.Item>
          <Input.TextArea
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmitComment}
            style={{ float: "right" }}
          >
            Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostDetails;
