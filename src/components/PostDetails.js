import React, { useEffect, useState } from "react";
import { fetchPostById } from "../api";
import { Card, Input, Button, Form } from "antd";
import { UserOutlined } from "@ant-design/icons";

const PostDetails = ({ postId }) => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [target, setTarget] = useState(null);

  useEffect(() => {
    fetchPostById(postId).then(setPost);
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    const newComment = {
      id: comments.length + 1,
      content: comment,
      date: new Date().toISOString(),
      username: "Current User", // This should be dynamically set based on user context
      parentId: target, // Target comment ID, or null for top-level comments
      targetId: postId, // Always refers to the current post
    };
    setComments([...comments, newComment]);
    setComment("");
    setTarget(null); // Reset target after submitting the comment
  };

  const handleReplyClick = (commentId) => {
    setTarget(commentId); // Set the target to the comment ID being replied to
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment, index) => (
        <div
          key={index}
          style={{
            marginLeft: parentId ? "20px" : "0px",
            marginBottom: "10px",
          }}
        >
          <p>
            {comment.content} - {comment.username},{" "}
            {new Date(comment.date).toLocaleDateString()}
          </p>
          <Button
            size="small"
            type="link"
            onClick={() => handleReplyClick(comment.id)}
          >
            Reply
          </Button>
          {renderComments(comment.id)}
        </div>
      ));
  };

  return (
    <div
      style={{ padding: "20px", position: "relative", paddingBottom: "50px" }}
    >
      {post ? (
        <Card
          title={post.title}
          extra={
            <Button icon={<UserOutlined />} onClick={() => setTarget(null)}>
              Comment
            </Button>
          }
          style={{ marginBottom: "20px", height: "600px", overflowY: "auto" }}
        >
          <p>{post.content}</p>
          <p>
            <small>{post.date}</small>
          </p>
          {renderComments()}
        </Card>
      ) : (
        <p>Loading...</p>
      )}
      <Form
        style={{
          position: "fixed",
          bottom: 0,
          left: "295px",
          right: "45px",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        <Form.Item style={{ marginBottom: 8 }}>
          <Input.TextArea
            rows={2}
            value={comment}
            onChange={handleCommentChange}
            placeholder={
              target ? "Replying to a comment..." : "Write a comment..."
            }
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
