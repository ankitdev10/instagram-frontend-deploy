import "./leftbar.scss";
import {
  Home,
  SearchOutlined,
  ExploreOutlined,
  MovieCreationOutlined,
  ChatBubbleOutline,
  FavoriteBorderOutlined,
  AddBoxOutlined,
  Close,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Upload from "../upload/Upload";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const [open, setOpen] = useState(false); // intially not opened
  const [openUpload, setOpenUpload] = useState(false);
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  const handleUploadPage = () => {
    open ? navigate("/upload") : setOpenUpload(true);
  };
  return (
    <div className="leftbarContainer">
      {!open && (
        <div onClick={() => setOpen(true)} className="mobileIcon">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div className={`leftbarWrapper ${!open && "hidden"}`}>
        <Link
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          to="/"
        >
          <span className="logo">Instagram</span>
        </Link>
        <div className="leftBarItems">
          <div className="itemsTop">
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to="/"
            >
              <div className="item">
                <Home className="icon" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/search`}
            >
              <div className="item">
                <SearchOutlined className="icon" />
                <span>Search</span>
              </div>
            </Link>
            <div className="item">
              <ExploreOutlined className="icon" />
              <span>Explore</span>
            </div>
            <div className="item">
              <MovieCreationOutlined className="icon" />
              <span>Reels</span>
            </div>
            <div className="item">
              <ChatBubbleOutline className="icon" />
              <div className="number">1</div>
              <span>Message</span>
            </div>
            <div className="item">
              <FavoriteBorderOutlined className="icon" />
              <div className="number">1</div>
              <span>Notifications</span>
            </div>
            <div onClick={handleUploadPage} className="item">
              <AddBoxOutlined className="icon" />
              <span>Create</span>
            </div>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={`/profile/${currentUser._id}`}
            >
              <div className="item">
                <img
                  className="profileImg"
                  src={currentUser?.profilePicture}
                  alt="pp"
                />
                <span>{currentUser?.username}</span>
              </div>
            </Link>
          </div>

          <div className="itemsBottom">
            <div className="icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <span>More</span>
          </div>
        </div>
        {openUpload && <Upload setOpenUpload={setOpenUpload} />}

        <Close
          onClick={() => setOpen(false)}
          className="mobileIcon"
          style={{ fontSize: "32px" }}
        />
      </div>
    </div>
  );
};

export default LeftBar;
