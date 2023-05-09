/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import NavBar from "../navBar";

const UsersProfile = ({ name }) => {
  const [blog, setBlog] = useState([]);

  console.log("blogger", { name });
  console.log("blogger", name);

  useEffect(() => {
    getUploads();
  }, []);
  async function getUploads() {
    const response = await fetch(`http://localhost:3000/blog/${name}`);
    const json = await response.json();
    setBlog(json);
  }
  return (
    <div className="container">
      <NavBar />
      <br />
      <br />
      <div>
        <h1>{name}'s More Blogs !!</h1>
        <div className="item-container">
          {blog.map((photo) => (
            <div className="card" key={photo.id}>
              <img
                src={`http://localhost:3000/${photo.photo}`}
                height="300"
                width="300"
                alt="img"
              />
              <p>Title: {photo.title}</p>
              <p>Content: {photo.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersProfile;
