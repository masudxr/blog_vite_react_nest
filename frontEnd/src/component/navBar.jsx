import {  Link } from "react-router-dom";

function NavBar() {
  return (
    <div className='nav'>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">User Profile</Link>
      </li>
      <li>
        <Link to="/post">Post Blogs</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/registration">Registration</Link>
      </li>
    </div>
  );
}

export default NavBar;