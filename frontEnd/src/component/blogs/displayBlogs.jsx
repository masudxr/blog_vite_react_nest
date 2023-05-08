/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function UpdateBlogs({ name }){
    const [blogs, setBlog] = useState([]);

    useEffect(() => {
        get()
    }, [])

    async function get() {
        const response = await fetch(`http://localhost:3000/blog/updateBlogs`)
        const json = await response.json();
        console.log('json', json);
        setBlog(json);
    }

    return (
        <div>
            <h1>Welcome {name} To Our Blogs Diary </h1>
            <div className='item-container'>
                {blogs.map((blog) => (
                <div className='card'key={blog.id}>
                    <h3>Title: {blog.title}</h3>
                    <img src={`http://localhost:3000/${blog.photo}`} alt='img' />
                    <h3> Content: {blog.content}</h3>
                    <h3> Writer: {blog.user.name}</h3>
                </div>
                ))}
            </div>
        </div>
    )
}