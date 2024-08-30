import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Link } from "react-router-dom";

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  // Function to fetch user blogs
  const sendRequest = async () => {
    try {
      const res = await axios.get(`${window.location.origin}/api/blog/user/${id}`);
      const data = await res.data;
      return data;
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  // Function to handle blog deletion
  const handleDelete = async (blogId) => {
  console.log("Deleting blog ID:", blogId); // Check the ID being sent
  try {
    await axios.delete(`${window.location.origin}/api/blog/${blogId}`);
    // ... rest of your code
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};


  return (
    <div>
      {user && user.blogs && user.blogs.map((blog) => (
        <div key={blog._id}>
          <Blog
            id={blog._id}
            isUser={true}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={user.name}
          />
          <div>
            <Link to={`/myBlogs/edit/${blog._id}`}>Edit</Link>
            <button onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserBlogs;
