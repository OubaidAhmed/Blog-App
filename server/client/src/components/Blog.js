import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  const navigate = useNavigate();

  // const handleEdit = () => {
  //   navigate(`${window.location.origin}/api/blog/myBlogs/${id}`);
  // };

  // const deleteRequest = async () => {
  //   try {
  //     await axios.delete(`/${id}`)
  //   } catch (error) {
  //     console.error("Error deleting blog:", error);
  //     throw error;
  //   }
  // };

  // const handleEdit = () => {
  //   navigate(`/blogs/edit/${blogId}`);
  //   // Navigate to the edit page for the blog with the given id
  // };

  const handleEdit = () => {
  navigate(`/myBlogs/edit/${id}`);
  // Navigates to the edit page for the blog with the given id
};



  const deleteRequest = async () => {
    try {
      await axios.delete(`${window.location.origin}/api/blog/${id}`);
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  };


  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(`${window.location.origin}/api/blog/delete/${id}`);
  //     console.log("Blog deleted successfully:", response.data);
  //     navigate("/myBlogs"); // Redirect after successful deletion
  //   } catch (err) {
  //     console.error("Error deleting blog:", err);
  //   }
  // };

  // const handleDelete = async () => {
  //   const url = `${window.location.origin}/api/blog/${id}`; // Construct the delete URL
  //   console.log("Delete URL:", url); // Log the delete URL

  const handleDelete = async () => {
  try {
    await deleteRequest(); // Call the delete request function
    navigate("/myBlogs"); // Redirect after successful deletion
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};

  return (
    <div>
      <Card
        sx={{
          width: "50%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": { boxShadow: "10px 10px 20px #ccc" },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              edit
              {/* <ModeEditOutlineOutlined color="info" /> */}
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "}
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
