import {axiosInstance} from "../../config";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import LeftBar from "../../components/leftbar/LeftBar";
import "./edit.scss";
import axios from "axios"

const Edit = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [user, setUser] = useState({}); // this will hold our updated user
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [profilePicture, setProfilePicture] = useState(
    currentUser.profilePicture
  );

  //fetch user

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get("/users/" + userId);
      setUser(res.data);
    };
    fetchUser();
  }, [userId, file]);

  // state for updated fileds

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  //upload photo to cloudinary and set user
  useEffect(() => {
    const uploadPhoto = async () => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "instagram");
      try {
        if (file) {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dlxubltts/image/upload",
            data
          );
          setProfilePicture(uploadRes.data.url);
          setUser({ ...user, profilePicture: uploadRes.data.url });
        }
      } catch (error) {}
    };
    uploadPhoto();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/users/${userId}`, {
        ...user,
        profilePicture,
      });
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit">
      <div className="editWrapper">
        <div className="leftBar">
          <LeftBar />
        </div>
        <div className="editForm">
          <form action="">
            <div className="editFormTop">
              <img
                className="editFormImg"
                src={file ? URL.createObjectURL(file) : user.profilePicture}
                alt=""
              />
              <div className="editFormUser">
                <span className="editFormUsername">{currentUser.username}</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="editPP"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="editPP" className="changePP">
                  Change profile picture
                </label>
              </div>
            </div>
            <div className="formItem">
              <label htmlFor="">Full name:</label>
              <input
                placeholder={user?.fullname}
                className="editInputBox"
                name="fullname"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label htmlFor="">Username:</label>
              <input
                placeholder={user?.username}
                className="editInputBox"
                name="username"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label htmlFor="">Email:</label>
              <input
                placeholder={user?.email}
                className="editInputBox"
                name="email"
                type="email"
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label htmlFor="">Password:</label>
              <input
                placeholder="*****"
                className="editInputBox"
                name="password"
                type="password"
                onChange={handleChange}
              />
            </div>
            <div className="formItem">
              <label htmlFor="">Bio:</label>
              <textarea
                rows={5}
                cols={6}
                className="editInputBox"
                placeholder={user?.bio}
                name="bio"
                type="text"
                onChange={handleChange}
              />
            </div>
            <div className="btnContainer">

            <button onClick={handleSubmit} className="editFormBtn">
              Confirm
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
