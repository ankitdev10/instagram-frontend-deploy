import {
  BookmarkBorderOutlined,
  FavoriteBorderOutlined,
  MoreHoriz,
  SentimentSatisfied,
  FavoriteSharp,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import {axiosInstance} from "../../config"

import { format } from "timeago.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./post.scss";

const Post = ({ post }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("/users/" + post.userId);
        setUser(res.data);
      } catch (error) {}
    };
    fetchUser();
  }, [post]);

  const handleUnLike = async () => {
    // check if post is liked or not
    try {
      await axiosInstance.put(`/posts/unlike/${post._id}`);
      setIsLiked(false);
      setLikes((prev) => prev - 1);
    } catch (error) {}
  };

  const handleLike = async () => {
    // check if post is liked or not
    try {
      await axiosInstance.put(`/posts/like/${post._id}`);
      setIsLiked(true);

      setLikes((prev) => prev + 1);
    } catch (error) {}
  };

  return (
    <div className="postContainer">
      {/* each post */}
      <div className="post">
        {/* pp and id section */}
        <div className="postTop">
          <div className="postTopLeft">
            <img src={user.profilePicture} alt="pp" className="postPP" />
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${post.userId}`}
            >
              <span className="postTopName">{user?.username}</span>
            </Link>
          </div>
          <div className="postTopRight">
            <MoreHoriz className="postTopRightIcon" />
          </div>
        </div>
        {/* post image and likes counter */}
        <div className="postCenter">
          <img src={post?.image} alt="" className="postImg" />
          <div className="postCenterDetails">
            <div className="postCenterDetailsIcons">
              <div className="postCenterDetailsIconsLeft">
                {!isLiked ? (
                  <FavoriteBorderOutlined
                    onClick={handleLike}
                    className="postCenterIcon"
                  />
                ) : (
                  <FavoriteSharp
                    style={{ color: "#ed4956" }}
                    className="postCenterIcon"
                    onClick={handleUnLike}
                  />
                )}

                <svg
                  aria-label="Comment"
                  className="_ab6- postCenterIcon"
                  color="#8e8e8e"
                  fill="#8e8e8e"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>

                <svg
                  aria-label="Share Post"
                  className="_ab6- postCenterIcon"
                  color="#000"
                  fill="#000"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="30"
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>
                </svg>
              </div>
              <div className="postCenterDetailsIconsRight">
                <BookmarkBorderOutlined className="postCenterIcon" />
              </div>
            </div>

            <div className="postCenterDetailsLikes">
              Liked by{" "}
              <strong>
                {likes} {likes > 1 ? "peoples" : "people"}
              </strong>
            </div>
          </div>
        </div>

        {/* captions and comment section */}
        <div className="postBottom">
          <div className="caption">
            <span className="accountName">{user?.username}</span>
            <span className="captionText">{post?.desc}</span>
          </div>
          <div className="postCommentInfo">
            <p className="postBottomComment">View all 10 comments</p>
            <p className="timeAgo">{format(post?.createdAt)}</p>
          </div>

          <div className="postComment">
            <SentimentSatisfied className="postCommentIcon" />
            <input
              placeholder="Add a comment"
              type="text"
              className="commentInput"
            />
            <button className="postCommentBtn">Post</button>
          </div>
        </div>
      </div>
      <span className="caughtUp">You are all caught up!</span>
    </div>
  );
};

export default Post;
