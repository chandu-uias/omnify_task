import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, CircularProgress } from "@mui/material";
import axios from "axios";
import config from "../config";

const PublicBlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${config.BASE_URL}/api/blogs/${id}`)
      .then((res) => {
        setBlog(res.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", m: "2rem auto" }} />;

  if (!blog) return <Typography textAlign="center">Blog not found</Typography>;

  return (
    <Box width="80%" mx="auto" mt={4}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Posted on {new Date(blog.date).toLocaleDateString()}
      </Typography>
      <img
        src={blog.img}
        alt={blog.title}
        style={{ width: "100%", maxHeight: 400, objectFit: "cover", borderRadius: 10 }}
      />
      <Typography mt={4} fontSize="1.2rem">
        {blog.desc}
      </Typography>
    </Box>
  );
};

export default PublicBlogDetail;
