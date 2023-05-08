/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import NavBar from '../navBar';
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";



export default function UpdatePost({ name }){
    const navigate = useNavigate();

    const [blogs, setBlog] = useState([]);
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);

    const location = useLocation()
    const Name = location.state.name
    console.log('passing blogs id', Name);
    const cookie = document.cookie;

    useEffect(() => {
        getBlogs();
    }, [])

    async function getBlogs() {
        const response = await fetch(`http://localhost:3000/blog/${Name}`)
        const json = await response.json();
        console.log('get blogs', json);
        setBlog(json);
    }
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "title") {
            setTitle(value);
        }
        if (id === "content") {
            setContent(value);
        }
    }

    async function handleSubmit() {
        console.log(title)
        console.log(content)
        // console.log(file.name)
        const jsonData = {
            "title": title,
            "content": content,
        }
        console.log('json user Data', jsonData);

        const post = await fetch(`http://localhost:3000/blog/${Name}`, {
            method: 'PUT',
            headers: ({ 'Content-Type': 'application/json',
            Authorization: 'Bearer ' +cookie 
        }),
            body: JSON.stringify(jsonData),
        })
        const updatePost = await post.json();
        console.log('Post Updated:', updatePost);
        navigate("/profile");
    }
    return (
        <div>
        <NavBar />
        <br />
        <br />
    <h1> {name} Create Your Blog Here !! </h1>
    <div className="container">
    <div className="form">
        <div className="form-body">
            <div className="title">
                <label name="title">User Name </label>
                <input type="text" value={title} onChange={(e) => handleInputChange(e)} id="title" placeholder={blogs.title} />
            </div>
            <div className="content">
                <label name="email">Email </label>
                <textarea id="content" name="content" value={content} onChange={(e) => handleInputChange(e)} rows={4} cols={40} placeholder={blogs.content} />
            </div>
            {/* <div className="image">
                <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*"/>
            </div> */}
        </div>
        <div className="footer">
            <button onClick={() => handleSubmit()} type="submit" className="btn">Update Blog</button>
        </div>
    </div>
    </div>

    </div>
    )
}