/* eslint-disable react/prop-types */
import { useState } from 'react';
import NavBar from '../navBar';
import { useNavigate } from "react-router-dom";

export default function PostBlogs({ name }){
    const navigate = useNavigate();

    const cookie = document.cookie;

    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

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
        const jsonData = {
            "title": title,
            "content": content,
        }
        console.log('json user Data', jsonData);

        const post = await fetch("http://localhost:3000/blog", {
            method: 'POST',
            headers: ({ 'Content-Type': 'application/json',
            Authorization: 'Bearer ' +cookie 
        }),
            body: JSON.stringify(jsonData),
        })
        const updatePost = await post.json();
        console.log('Done Post', updatePost);
        navigate("/");
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
                    <input type="text" value={title} onChange={(e) => handleInputChange(e)} id="title" placeholder="Blog title" />
                </div>
                <div className="content">
                    <label name="email">Email </label>
                    <textarea id="content" name="content" value={content} onChange={(e) => handleInputChange(e)} rows={4} cols={40} placeholder="Blog Body" />
                </div>
            </div>
            <div className="footer">
                <button onClick={() => handleSubmit()} type="submit" className="btn">Create</button>
            </div>
        </div>
        </div>

        </div>
    )
}