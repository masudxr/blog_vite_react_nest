import "./App.css";
import "./component/style.css";
import Home from "./component/home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./component/auth/login";
import RegistrationForm from "./component/auth/registration";
import { useEffect, useState } from "react";
import WriterProfile from "./component/blogs/writerProfile";
import PostBlogs from "./component/blogs/postBlog";
import UpdatePost from "./component/blogs/updatePost";
import DeletePost from "./component/blogs/deleteBlog";
import UploadProfile from "./component/blogs/uploadProfile";
import UsersProfile from "./component/blogs/userProfile";
import DeleteComment from "./component/blogs/comtRemove";


export default function App() {
  const [users, setUsers] = useState([]);

  const cookie = document.cookie;
  console.log("cookie", cookie);

  useEffect(() => {
    getUSerProfile();
  }, []);

  async function getUSerProfile() {
    const response = await fetch(`http://localhost:3000/auth/profile`, {
      headers: {
        Authorization: "Bearer " + cookie,
      },
    });
    const json = await response.json();
    setUsers(json);
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home {...users} />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/profile" element={<WriterProfile {...users} />} />
          <Route path="/post" element={<PostBlogs {...users} />} />
          <Route path="/update" element={<UpdatePost {...users} />} />
          <Route path="/delete" element={<DeletePost {...users} />} />
          <Route path="/upload" element={<UploadProfile {...users} />} />
          <Route path="/userprofile" element={<UsersProfile {...users} />} />
          <Route path="/removecomment" element={<DeleteComment {...users} />} />
        </Routes>
      </Router>
    </div>
  );
}
