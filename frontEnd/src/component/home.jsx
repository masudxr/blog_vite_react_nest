/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./style.css";
import UpdateBlogs from "./blogs/displayBlogs";
import NavBar from "./navBar";

const Home = (props) => {
  return (
    <>
      <NavBar />
      <br />
      <br />
      <UpdateBlogs name={props.name} />
    </>
  );
};

export default Home;
