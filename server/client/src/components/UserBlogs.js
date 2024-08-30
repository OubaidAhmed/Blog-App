import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  // Function to fetch user blogs
  const sendRequest = async () => {
    const res = await axios
      .get(`${window.location.origin}/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  // Function to handle blog deletion
  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${window.location.origin}/api/blog/${blogId}`);
      // Remove the deleted blog from the user's state
      setUser((prevUser) => ({
        ...prevUser,
        blogs: prevUser.blogs.filter((blog) => blog._id !== blogId),
      }));
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
            <Link to={`/myBlogs/edit/${blog._id}`}>Edit</Link> {/* Edit link */}
            <button onClick={() => handleDelete(blog._id)}>Delete</button> {/* Delete button */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserBlogs;
