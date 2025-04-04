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
      return res.status(500).json({ message: "Failed to fetch blogs", error: e.message });
    }
  
    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }
  
    // Pagination logic
    const { page = 1, limit = 5 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);
  
    try {
      const paginatedBlogs = await Blog.find()
        .populate("user")
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
  
      const total = await Blog.countDocuments();
  
      return res.status(200).json({
        blogs: paginatedBlogs,
        totalPages: Math.ceil(total / limitNumber),
        currentPage: pageNumber,
      });
    } catch (err) {
      console.error("Error fetching paginated blogs:", err);
      return res.status(500).json({ message: "Server Error", error: err.message });
    }
  };
  



const addBlog = async(req,res,next) =>{

    const { title , desc , img , user } = req.body;

    const currentDate = new Date();

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (e) {
        return console.log(e);
    }
        if(!existingUser){
        return res.status(400).json({message: " Unautorized"});
    }


    const blog = new Blog({
        title ,desc , img , user, date: currentDate
    });

    try {
      await  blog.save();
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
    return res.status(200).json({blog});
}

const updateBlog = async(req,res,next) => {
    const blogId = req.params.id;
    const { title, description } = req.body;
    // console.log("updated ",req.body);

   
    let blog;

    try {
         blog = await Blog.findByIdAndUpdate(blogId , {
            title,
            desc:description
        });
    } catch (e) {
        return console.log(e);
    }

    if(!blog){
        return res.status(500).json({message : "Unable to update"})
    }
    
    return res.status(200).json({blog});
}

const getById = async (req,res,next) =>{
    const id = req.params.id;
    let blog;

    try{
        blog = await Blog.findById(id);
    }
    catch(e){
        return console.log(e);
    }

    if(!blog){
        return res.status(500).json({ message : "not found"});
    }
    
    return res.status(200).json({blog});
}

const deleteBlog = async (req, res, next) => {

    const id = req.params.id;
    
    try {
        if (!id) {
            return res.status(400).json({ message: 'Blog ID is required' });
          }
        const blog = await Blog.findByIdAndDelete(id).populate('user');

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        
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

module.exports = { getAllBlogs ,addBlog , updateBlog , getById ,deleteBlog , getByUserId} ;