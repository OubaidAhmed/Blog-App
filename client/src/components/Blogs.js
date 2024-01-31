import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

function Blogs() {
  const [blogs, setBlogs] = useState();
  // const sendRequest = async () => {
  //   const res = await axios
  //     .get("https://blog-app-lake-beta.vercel.app/api/blog")
  //     .catch((err) => console.log(err));

  //   const data = await res.data;
  //   return data;
  // };

  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/blog");
      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to be caught by the component
    }
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  return (

    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            content={blog.content}
            image={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>



  );
}

export default Blogs;
