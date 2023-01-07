import "./account.scss";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import {axiosInstance} from "../../config"
import SingleAccountPost from "../accountSingle/SingleAccountPost";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LIst from "../list/LIst";
import { follow, unfollow } from "../../redux/userSlice";

const AccountPage = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const [user, setUser] = useState({});
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showList, setShowList] = useState(false);
  const [listType, setListType] = useState(""); // check following or followers in calling the component

  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // following or followers list

  const handleList = async (type) => {
    setShowList(true);

    try {
      setListType("following");
      if (type === "following") {
        await Promise.all(
          user.following.map(async (accountId) => {
            const res = await axiosInstance.get("/users/" + accountId);
            setFollowing((prev) => {
              return [...prev, res.data];
            });
          })
        );
      } else if (type === "followers") {
        setListType("followers");
        await Promise.all(
          user.followers.map(async (accountId) => {
            const res = await axiosInstance.get("/users/" + accountId);
            setFollowers((prev) => {
              return [...prev, res.data];
            });
          })
        );
      }
    } catch (error) {}
  };

  // FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axiosInstance.get("/users/" + userId);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  //fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosInstance.get("/posts/" + userId);
      setPost(
        res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    };
    fetchPosts();
  }, [userId]);

  //FOLLOW UNFOLLOW USER

  const handleFollow = async () => {
    if (currentUser.following.includes(userId)) {
      await axiosInstance.put(`/users/unfollow/${userId}`);
      dispatch(unfollow(userId));
    } else {
      await axiosInstance.put(`/users/follow/${userId}`);
      dispatch(follow(userId));
    }
  };

  return (
    <div className="account">
      <div className="accountWrapper">
        <div className="accountInfo">
          <div className="accountInfoLeft">
            <img
              src={
                currentUser._id === userId
                  ? currentUser.profilePicture
                  : user.profilePicture
              }
              alt=""
              className="accountPP"
            />
          </div>
          <div className="accountInfoRight">
            <div className="accountRightTop">
              <span className="username">{user?.username}</span>
              {currentUser._id === userId ? (
                <Link style={{ textDecoration: "none" }} to={`/edit/${userId}`}>
                  <button className="editProfile">Edit Profile</button>
                </Link>
              ) : (
                <button onClick={handleFollow} className="followBtn">
                  {currentUser.following.includes(userId)
                    ? "Unfollow"
                    : "Follow"}
                </button>
              )}
            </div>
            <div className="accountRightCenter">
              <span>
                <strong>{post?.length}</strong> posts
              </span>
              <span
                onClick={() => handleList("followers")}
                className="followers"
              >
                <strong>{user?.followers?.length}</strong> followers
              </span>
              <span
                onClick={() => handleList("following")}
                className="following"
              >
                <strong>{user?.following?.length}</strong> following
              </span>
            </div>
            <div className="accountRightBottom">
              <span className="fullname">{user?.fullname}</span>
              <p className="accountBio">{user?.bio}</p>
            </div>
          </div>
        </div>
        <hr />

        <div className="accountPosts">
          {post?.map((p) => (
            <SingleAccountPost key={p._id} post={p} />
          ))}
        </div>
      </div>
      {showList && (
        <div className="list">
          <LIst
            listType={listType}
            list={listType === "following" ? following : followers}
            setList={listType === "following" ? setFollowing : setFollowers}
            setShowList={setShowList}
          />
        </div>
      )}
    </div>
  );
};

export default AccountPage;
