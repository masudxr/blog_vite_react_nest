import './App.css';
import './component/style.css';
import Home from './component/home';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginForm from './component/auth/login';
import RegistrationForm from './component/auth/registration';
import {useEffect, useState} from "react";
import WriterProfile from './component/blogs/writerProfile';
import PostBlogs from './component/blogs/postBlog';
import UpdatePost from './component/blogs/updatePost';
import DeletePost from './component/blogs/deleteBlog';



export default function App() {
  
  const [users, setUsers] = useState([]);

  const cookie = document.cookie;
  console.log('cookie', cookie);

  useEffect(() => {
      getUSerProfile();
  
  }, [])
  
    async function getUSerProfile() {
      const response = await fetch(`http://localhost:3000/auth/profile`, {
        headers: ({
          Authorization: 'Bearer ' +cookie
        })
      })
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
        {/* <Route path="/home" element={<UpdateBlogs {...users}/>} /> */}
        <Route path="/profile" element={<WriterProfile {...users}/>} />
        <Route path="/post" element={<PostBlogs {...users}/>} />
        <Route path="/update" element={<UpdatePost {...users}/>} />
        <Route path="/delete" element={<DeletePost {...users}/>} />



      </Routes>
      </Router>
      
    </div>
  );
}