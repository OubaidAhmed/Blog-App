// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

// const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
// function BlogDetail() {
//   const navigate = useNavigate();
//   const [blog, setBlog] = useState();
//   const id = useParams().id;

//   const [inputs, setInputs] = useState({});

//   const handleChange = (event) => {
//     setInputs((prevValue) => ({
//       ...prevValue,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const fetchDetails = async () => {
//     const res = await axios
//       .get(`${window.location.origin}/api/blog/${id}`)
//       .catch((err) => console.log(err));

//     const data = res.data;
//     return data;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     sendRequest()
//       .then((data) => console.log(data))
//       .then(() => navigate("/myBlogs"));
//   };

//   useEffect(() => {
//     fetchDetails().then((data) => {
//       setBlog(data);
//       setInputs({
//         title: data.blog.title,
//         content: data.blog.content,
//         image: data.blog.image,
//       });
//     });
//   }, [id]);

//   const sendRequest = async () => {
//     const res = await axios
//       .put(`${window.location.origin}/api/blog/update/${id}`, {
//         title: inputs.title,
//         content: inputs.content,
//         image: inputs.image,
//       })
//       .catch((err) => console.log(err));

//     const data = await res.data;
//     return data;
//   };

//   return (
//     <div>
//       {inputs && (
//         <form onSubmit={handleSubmit}>
//           <Box
//             border={2}
//             borderColor="secondary.main"
//             borderRadius={10}
//             boxShadow="10px 10px 20px #ccc"
//             padding={3}
//             margin={"auto"}
//             marginTop={5}
//             display="flex"
//             flexDirection={"column"}
//             width={"70%"}
//           >
//             <Typography
//               fontWeight={"bold"}
//               padding={3}
//               color="gray"
//               variant="h3"
//               textAlign={"center"}
//             >
//               Create your Blog
//             </Typography>
//             <InputLabel sx={labelStyle}>Title</InputLabel>
//             <TextField
//               name="title"
//               onChange={handleChange}
//               value={inputs.title}
//               margin="normal"
//               variant="outlined"
//             />
//             <InputLabel sx={labelStyle}>Content</InputLabel>
//             <TextField
//               name="content"
//               onChange={handleChange}
//               value={inputs.content}
//               margin="normal"
//               variant="outlined"
//             />
//             <InputLabel sx={labelStyle}>ImageURL</InputLabel>
//             <TextField
//               name="image"
//               onChange={handleChange}
//               value={inputs.image}
//               margin="normal"
//               variant="outlined"
//             />
//             <Button
//               sx={{ mt: 2, borderRadius: 4 }}
//               variant="contained"
//               color="warning"
//               type="submit"
//             >
//               Submit Blog
//             </Button>
//           </Box>
//         </form>
//       )}
//     </div>
//   );
// }

// export default BlogDetail;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyle = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

function BlogDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // get id from route params
  const [blog, setBlog] = useState(null);
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: ""
  });

  useEffect(() => {
    if (id) {
      fetchDetails().catch((error) => {
        console.error("Error fetching blog details:", error);
        navigate("/"); // Redirect to home if there's an error
      });
    }
  }, [id]);


  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${window.location.origin}/api/blog/${id}`);
      const data = res.data;

      if (!data || !data.blog) {
        throw new Error("Blog not found");
      }

      setBlog(data);
      setInputs({
        title: data.blog.title,
        content: data.blog.content,
        image: data.blog.image,
      });
    } catch (err) {
      console.error(err);
      navigate("/"); // Redirect to home if the blog doesn't exist
    }
  };

  const handleChange = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (id) {
      await updateBlog();
    } else {
      await createBlog();
    }

    navigate("/myBlogs");
  };

  const updateBlog = async () => {
    try {
      const res = await axios.put(`${window.location.origin}/api/blog/update/${id}`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const createBlog = async () => {
    try {
      const res = await axios.post(`${window.location.origin}/api/blog/create`, {
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
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
            {id ? "Edit your Blog" : "Create your Blog"}
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyle}>Content</InputLabel>
          <TextField
            name="content"
            onChange={handleChange}
            value={inputs.content}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <InputLabel sx={labelStyle}>ImageURL</InputLabel>
          <TextField
            name="image"
            onChange={handleChange}
            value={inputs.image}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            {id ? "Update Blog" : "Create Blog"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default BlogDetail;
