import Post from "../post/Post";
import Story from "../stories/Story";
import "./feed.scss";

import { useEffect } from "react";
import { axiosInstance } from "../../config";
import { useState } from "react";

import { useLocation } from "react-router-dom";

const Feed = ({ page }) => {
  const [followingPosts, setFollowingPosts] = useState([]);
  const [randomPosts, setRandomPosts] = useState([]);
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

  //get random posts

  useEffect(() => {
    const getRandomPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts");
        setRandomPosts(res.data.splice(0, 3));
      } catch (error) {}
    };
    getRandomPosts();
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
        <>
          <div className="noPost">
            You are looking at some random posts. Please follow to see your
            friends' posts.
          </div>
          {randomPosts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
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
