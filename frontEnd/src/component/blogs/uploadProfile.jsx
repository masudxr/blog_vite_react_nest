import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadProfile = () => {
  const [image, setImage] = useState(" ");

  useEffect(() => {}, []);

  const cookie = document.cookie;

  const navigate = useNavigate();

  async function handleSubmit() {
    const formdata = new FormData();
    console.log("image", image.name);
    formdata.append("file", image, image.name);
    const url = `http://localhost:3000/profile`;

    await axios.post(url, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + cookie,
      },
    });
    navigate("/profile");
  }

  return (
    <div>
      <form>
        <input
          type="file"
          name="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <h1 onClick={() => handleSubmit()} className="btn">
          Submit
        </h1>
      </form>
    </div>
  );
};

export default UploadProfile;
