// src/components/EditBlog.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await axios.get(`/api/blog/${id}`);
      setBlog(response.data.blog);
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/api/blog/update/${id}`, blog);
    navigate("/myBlogs");
  };

  return (
    <div>
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          value={blog.image}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
