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

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    try {
      await axios.delete(`https://blog-app-lake-beta.vercel.app/api/blog/${id}`)
      // No need to return any data since we're only interested in the deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRequest();
      // Perform any other actions after successful deletion if needed
      navigate("/", { replace: true }); // Navigate to the home page
    } catch (error) {
      console.error("Error deleting blog:", error);
      // Handle the error, show a message to the user, etc.
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
              <ModeEditOutlineOutlined color="info" />
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
