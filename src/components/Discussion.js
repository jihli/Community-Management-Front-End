import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";

const Discussion = ({ onPostSelect }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts("discussion").then(setPosts);
  }, []);

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        width: "100%",
        padding: "10px",
      }}
    >
      <ul>
        {posts.map((post) => (
          <li
            key={post.id}
            onClick={() => onPostSelect(post.id)}
            style={{ cursor: "pointer" }}
          >
            {`${post.title} - by ${post.username || "Unknown"}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Discussion;
