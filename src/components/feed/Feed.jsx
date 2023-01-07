import Post from "../post/Post";
import Story from "../stories/Story";
import "./feed.scss";

import { useEffect } from "react";
import {axiosInstance} from "../../config"
import { useState } from "react";

import { useLocation } from "react-router-dom";

const Feed = ({ page }) => {
  const [followingPosts, setFollowingPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  // fetch posts of following peoples
  useEffect(() => {
    const getFollowingPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts/following");
        let postArr = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setFollowingPosts(postArr);
      } catch (error) {}
    };
    getFollowingPosts();
  }, [userId]);


  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts/" + userId);
        let postArr = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setUserPosts(postArr);
      } catch (error) {}
    };
    getUserPosts();
  }, [userId]);

  return (
    <div className="feedContainer">
      <Story />
      {followingPosts.length === 0 && (
        <div className="noPost">Please follow to see other users posts</div>
      )}
      {page === "home" &&
        followingPosts.map((post) => <Post post={post} key={post._id} />)}
      {
        (page =
          "userposts" &&
          userPosts.map((post) => <Post post={post} key={post._id} />))
      }
    </div>
  );
};

export default Feed;
