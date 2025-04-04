import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./Blog";
import config from "../config";

const UserBlogs = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${userId}`);
      console.log("Fetched user and blogs:", res.data);
      setUser(res.data.user);
      setBlogs(res.data.user.blogs);
    } catch (err) {
      console.error("Error fetching user blogs:", err);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
      fetchUserBlogs(); // refresh blogs after delete
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            isUser={true}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            // user={user?.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))
      ) : (
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          No blogs found for this user.
        </p>
      )}
    </div>
  );
};

export default UserBlogs;
