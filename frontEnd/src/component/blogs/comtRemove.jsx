/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function DeleteComment() {
  const navigate = useNavigate();
  const location = useLocation();
  const Name = location.state.name;
  const cookie = document.cookie;
  console.log("comment id", Name);

  useEffect(() => {
    removeBlogs();
  }, []);
  async function removeBlogs() {
    await fetch(`http://localhost:3000/comment/${Name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookie,
      },
    });
    navigate("/profile");
  }
}
