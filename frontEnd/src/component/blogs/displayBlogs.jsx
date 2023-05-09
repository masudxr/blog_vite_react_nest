/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import CommentHandle from './commentHandle';

export default function UpdateBlogs({ name }) {
  const [blogs, setBlog] = useState([]);
  const [content, setContent] = useState(null);
  const [result, setResult] = useState(null);

  const cookie = document.cookie;

  useEffect(() => {
    get();
  }, [result]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "content") {
      setContent(value);
    }
  };
  async function handleSubmit(id) {
    console.log("content:", content);
    console.log("id:", id);
    const com = {
      comment: content,
    };
    const res = await fetch(`http://localhost:3000/comment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
      body: JSON.stringify(com),
    });

    const response = await res.json();
    setResult(response);
    console.log("response:", response);
  }
  async function get() {
    const response = await fetch(`http://localhost:3000/blog/updateBlogs`);
    const json = await response.json();
    console.log("json", json);
    setBlog(json);
  }
  return (
    <div>
      <h1>Welcome {name} To Our Blogs Diary </h1>
      <div className="item-container">
        {blogs.map((blog) => (
          <div className="card" key={blog.id}>
            <h3>Title: {blog.title}</h3>
            <img src={`http://localhost:3000/${blog.photo}`} alt="img" />
            <h3> Content: {blog.content}</h3>
            <Link to="/userprofile" name={blog.user.name}>
              Bloger: {blog.user.name}
            </Link>
            <br />
            Comment Here !!
            <div className="content">
              <textarea
                id="content"
                name="content"
                onChange={(e) => handleInputChange(e)}
                rows={4}
                cols={34}
                placeholder="Put Your Comments Here !!"
              />
              <button
                onClick={() => handleSubmit(blog.id)}
                type="submit"
                className="btn"
              >
                Send Comment
              </button>
              {/* <button onClick={<CommentHandle name = {content} />} type="submit" className="btn">Send Comment</button> */}
            </div>
            Comments:
            {blog.comments.map((comt) => (
              <div key={comt.id}>
                <h3>{comt.comment}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
