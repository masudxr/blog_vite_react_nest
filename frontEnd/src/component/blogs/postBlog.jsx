/* eslint-disable react/prop-types */
import { useState } from "react";
import NavBar from "../navBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//

export default function PostBlogs({ name }) {
  const navigate = useNavigate();
  const cookie = document.cookie;

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [photo, setPhoto] = useState(" ");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "title") {
      setTitle(value);
    }
    if (id === "content") {
      setContent(value);
    }
  };

  async function handleSubmit() {
    console.log("title", title);
    console.log("content", content);
    console.log("photo", photo);

    const formdata = new FormData();
    formdata.append("file", photo, photo.name);
    formdata.append("body", content);
    formdata.append("title", title);

    const url = `http://localhost:3000/blog`;

    await axios.post(url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + cookie,
      },
    });
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
              <input
                type="text"
                value={title}
                onChange={(e) => handleInputChange(e)}
                id="title"
                placeholder="Blog Title!!"
              />
            </div>
            <div className="content">
              <label name="email">Email </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => handleInputChange(e)}
                rows={4}
                cols={40}
                placeholder="Type Your Content Here!!"
              />
            </div>
            <div>
              <label name="photo">Choose Photo:</label>
              <input
                type="file"
                name="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                accept="image/*"
              />
            </div>
          </div>
          <div className="footer">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              className="btn"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
