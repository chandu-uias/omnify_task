import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "./Blog";
import config from "../config";
import { Box, CircularProgress, Pagination, Typography } from "@mui/material";

const BlogsList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5; // Number of blogs per page

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs?page=${page}&limit=${limit}`);
      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={blog.user.name}
              date={new Date(blog.date).toLocaleDateString()}
            />
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default BlogsList;
