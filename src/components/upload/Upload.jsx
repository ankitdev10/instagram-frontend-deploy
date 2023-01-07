import "./upload.scss";
import { AddPhotoAlternate, Cancel } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "../../config"
import axios from "axios"
import { useSelector } from "react-redux";

const Upload = ({ setOpenUpload }) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");


  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const cancelUpload = () => {
    // if upload is called by mobile there wont be setOpenUpload function as it is not send to "MobileUpload.jsx". So if there is setOpenUpload available it means it was not called by mobile, so just change state and hide div. if called by mobile devices naviagte back to home page
    setOpenUpload ? setOpenUpload(false) : navigate("/");
  };

  useEffect(() => {
    const imageUpload = async () => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "instagram");
      try {
        if (file) {
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dlxubltts/image/upload",
            data
          );
          setImage(uploadRes.data.url);
        }
      } catch (error) {}
    };
    imageUpload();
  }, [file]);
  
  const handlePostUpload = async () => {
    try {
      await axiosInstance.post("/posts", {
        image,
        desc,
      });
      setOpenUpload(false);
      navigate(`/profile/${currentUser._id}`);
    } catch (error) {}
  };

  return (
    <div className="upload">
      <div className="uploadWrapper">
        <h4>
          Create new post{" "}
          <Cancel onClick={cancelUpload} className="cancelIcon" />
        </h4>
        {!file ? (
          <div className="main">
            <h5>Upload your file here</h5>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              type="file"
              id="up"
            />
            <label htmlFor="up">
              <AddPhotoAlternate className="uploadIcon" />
            </label>
          </div>
        ) : (
          <div className="uploadBox">
            <button onClick={() => setFile(null)} className="cancelPhoto">
              Cancel
            </button>
            <img src={URL.createObjectURL(file)} alt="" className="uploadImg" />
            <textarea
              rows="10"
              placeholder="Write something here"
              className="caption"
              required
              onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={handlePostUpload} className="uploadBtn">
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
