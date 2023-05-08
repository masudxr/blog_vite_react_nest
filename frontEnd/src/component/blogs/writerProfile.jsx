/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import NavBar from '../navBar';
import { Link } from "react-router-dom";

export default function WriterProfile(props){

    const [blogs, setBlog] = useState([]);
    const cookie = document.cookie;
  
    useEffect(() => {
        getBlogs();
    }, [])
    
      async function getBlogs() {
        const response = await fetch(`http://localhost:3000/blog/myblogs`, {
          headers: ({
            Authorization: 'Bearer ' +cookie
          })
        })
        const json = await response.json();
        setBlog(json);
      }

    return (
        <div>
          <NavBar />
          <br />
          <br />
          <br />
            <h2>Welcome to {props.name}'s profile</h2>
            <h2>Contact: {props.email}</h2>

            <h1>More Blogs</h1>
            <div className='item-container'>
                {blogs.map((blog) => (
                <div className='card'key={blog.id}>
                <h3>Title: {blog.title}</h3>
                <h3> Content: {blog.content}</h3>
                <Link to="/update" state = {{name: blog.id}}>Edit Post </Link>
                <Link to="/delete" state = {{name: blog.id}}>Delete Post </Link>
                </div>
                ))}
            </div>
        </div>
    )
}