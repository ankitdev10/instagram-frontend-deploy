import React, { useState } from "react";
import { FavoriteSharp } from "@mui/icons-material";
import "./accountSingle.scss";
import { Link } from "react-router-dom";

const SingleAccountPost = ({ post }) => {
  const [postDetails, setPostDetails] = useState(false);
  return (
    <div
      onMouseLeave={() => setPostDetails(false)}
      onMouseOver={() => setPostDetails(true)}
      className="post"
    >
      <img src={post.image} alt="" />

      <Link to={`/posts/${post.userId}`}>
        <div
          style={{ visibility: postDetails ? "" : "hidden" }}
          className="postDetail"
        >
          <span>
            <FavoriteSharp style={{ color: "#fff" }} className="postIcon" />
            {post.likes.length}
          </span>
          <span>
            <svg
              aria-label="Comment"
              className="_ab6- postIcon"
              color="#fff"
              fill="#fff"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="#fff"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
            10
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SingleAccountPost;
