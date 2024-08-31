import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const EditBlog = () => {
  const [inputs, setInputs] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await axios.get(`${window.location.origin}/api/blog/${id}`);
      setInputs(res.data.blog);
    };
    fetchBlog();
  }, [id]);

  const handleChange = (event) => {
    setInputs((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .put(`${window.location.origin}/myBlogs/edit/${id}`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    navigate("/myBlogs"); // Redirect back to myBlogs after submission
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={5}
          display="flex"
          flexDirection={"column"}
          width={"70%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="gray"
            variant="h3"
            textAlign={"center"}
          >
            Edit your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title || ""}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          <TextField
            name="content"
            onChange={handleChange}
            value={inputs.content || ""}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image || ""}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Update Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default EditBlog;

