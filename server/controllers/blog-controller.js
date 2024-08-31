// import mongoose from "mongoose";
// import Blog from "../model/Blog.js";
// import User from "../model/User.js";

// export const getAllBlogs = async (req, res, next) => {
//   let blogs;

//   try {
//     blogs = await Blog.find().populate("user");
//   } catch (error) {
//     console.log(error);
//   }
//   if (!blogs) {
//     return res.status(404).json({ message: "No Blog Found!" });
//   }
//   return res.status(200).json({ blogs });
// };

// export const addBlog = async (req, res, next) => {
//   const { title, content, image, user } = req.body;

//   let existingUser;
//   try {
//     existingUser = await User.findById(user);
//   } catch (error) {
//     return console.log(error);
//   }
//   if (!existingUser) {
//     return res.status(400).json({ message: "Unable to Find user by this Id" });
//   }

//   const blog = new Blog({
//     title,
//     content,
//     image,
//     user,
//   });
//   try {
//     const session = await mongoose.startSession();

//     session.startTransaction();
//     await blog.save({ session });
//     existingUser.blogs.push(blog);
//     await existingUser.save({ session });
//     await session.commitTransaction();
//     await session.endSession();
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: error });
//   }
//   return res.status(200).json({ blog });
// };

// export const updateBlog = async (req, res, next) => {
//   const { title, content, image } = req.body;
//   const blogId = req.params.id;

//   try {
//     const blog = await Blog.findByIdAndUpdate(blogId, {
//       title,
//       content,
//       image,
//     }, { new: true }); // Option to return the updated document

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found!" });
//     }

//     return res.status(200).json({ blog });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Unable to update Blog" });
//   }
// };


// export const getBlogById = async (req, res, next) => {
//   const id = req.params.id;

//   let blog;
//   try {
//     blog = await Blog.findById(id);
//   } catch (error) {
//     return console.log(error);
//   }
//   if (!blog) {
//     return res.status(404).json({ message: "No blog found!" });
//   }
//   return res.status(200).json({ blog });
// };

// export const deleteBlog = async (req, res, next) => {
//   let blog;
//   try {
//     blog = await Blog.findByIdAndRemove(req.params.id).populate("user");
//     if (blog) {
//       await blog.user.blogs.pull(blog);
//       await blog.user.save();
//       return res.status(200).json({ message: "Successfully Deleted" });
//     } else {
//       return res.status(404).json({ message: "Blog not found!" });
//     }
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Unable To Delete" });
//   }
// };





// export const getUserById = async (req, res, next) => {
//   let userBlogs;
//   try {
//     userBlogs = await User.findById(req.params.id).populate("blogs");
//   } catch (error) {
//     console.log(error);
//   }
//   if (!userBlogs) {
//     return res.status(400).json({ message: "No blogs found!" });
//   }
//   return res.status(200).json({ user: userBlogs });
// };



const mongoose = require("mongoose");
const { findByIdAndRemove } = require("../model/Blog");
const Blog = require("../model/Blog");
const User = require("../model/User");

const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (e) {
    console.log(e);
  }

  if (!blogs) {
    return res.status(404).json({ message: " No blogs found" });
  }

  return res.status(200).json({ blogs });
}

// const addBlog = async(req,res,next) =>{

//     const { title , desc , img , user } = req.body;

//     let existingUser;
//     try {
//         existingUser = await User.findById(user);
//     } catch (e) {
//         return console.log(e);
//     }

//     if(!existingUser){
//         return res.status(400).json({message: " Unautorized"});
//     }
//     const blog = new Blog({
//         title ,desc , img , user
//     });

//     try {
//       const session = await mongoose.startSession();
//       session.startTransaction();
//       await  blog.save({session});
//       existingUser.blogs.push(blog);
//       await existingUser.save({session});
//       await session.commitTransaction();
//     } catch (e) {
//        return res.status(500).json({message:e})
//     }

//     return res.status(200).json({blog});
// }


const addBlog = async (req, res, next) => {

  const { title, desc, img, user } = req.body;

  const currentDate = new Date();

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (e) {
    return console.log(e);
  }
  if (!existingUser) {
    return res.status(400).json({ message: " Unautorized" });
  }


  const blog = new Blog({
    title, desc, img, user, date: currentDate
  });

  try {
    await blog.save();
  } catch (e) {
    return console.log(e);
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session);
    existingUser.blogs.push(blog);
    await existingUser.save(session);
    session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ blog });
}

const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, desc } = req.body;

  let blog;

  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      desc
    });
  } catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to update" })
  }

  return res.status(200).json({ blog });
}

const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findById(id);
  }
  catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(500).json({ message: "not found" });
  }

  return res.status(200).json({ blog });
}

const deleteBlog = async (req, res, next) => {

  const id = req.params.id;

  try {
    const blog = await Blog.findByIdAndDelete(id).populate('user');

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Remove the blog from the user's blogs array
    const user = blog.user;
    user.blogs.pull(blog);
    await user.save();

    return res.status(200).json({ message: "Successfully deleted" });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to delete" });

  }
}


const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (err) {
    return console.log(err);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No Blog Found" });
  }
  return res.status(200).json({ user: userBlogs });
};

module.exports = { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId };