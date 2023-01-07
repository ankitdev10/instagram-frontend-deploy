import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow, logout } from "../../redux/userSlice";
import "./rightbar.scss";
import { axiosInstance } from "../../config";
import { useState } from "react";
import { Link } from "react-router-dom";
const Rightbar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [accounts, setAccounts] = useState([]);

  // provide random accounts to follow

  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await axiosInstance.get("/users");
        let arr = res.data
          .filter((account) => account._id !== currentUser._id)
          .slice(0, 4);
        setAccounts(arr);
      } catch (error) {}
    };
    getAccounts();
  }, [currentUser]);

  // HANDLE FOLLOW/UNFOLLOW REQUSET

  // const followUser = async (e) => {
  //   try {
  //     await axiosInstance.put(`/users/${e.target.value}/${e.target.id}`);
  //     window.location.reload();
  //   } catch (error) {}
  // };

  const followUser = async (e) => {
    try {
      e.preventDefault();
      if (e.target.value === "follow") {
        await axiosInstance.put(`/users/follow/${e.target.id}`);
        dispatch(follow(e.target.id));
      } else if (e.target.value === "unfollow") {
        await axiosInstance.put(`/users/unfollow/${e.target.id}`);
        dispatch(unfollow(e.target.id));
      }
    } catch (error) {}
  };

  const handleSignout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <div className="rightbarContainer">
      <div className="rightBarTop">
        <div className="rightBarTopLeft">
          <img src={currentUser.profilePicture} alt="" className="rightBarPP" />
          <div className="accountInfo">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${currentUser._id}`}
            >
              <span className="userName">{currentUser?.username}</span>
            </Link>
            <span className="accountName">{currentUser?.fullname}</span>
          </div>
        </div>

        <button onClick={handleSignout} className="signOutBtn">
          Sign Out
        </button>
      </div>

      <div className="rightBarBottom">
        <div className="suggestion">
          <span className="suggestionText">Suggestions for you</span>
          <button className="seeSuggestion">See all</button>
        </div>

        {accounts.map((account) => (
          <div key={account._id} className="suggestedAccounts">
            <div className="suggestedAccountLeft">
              <img
                src={account.profilePicture}
                alt=""
                className="suggestedPP"
              />
              <div className="suggestedInfo">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  to={`/profile/${account._id}`}
                >
                  <span className="suggestedUserName">{account?.fullname}</span>
                  <span className="suggestedAccountFollowedBy">
                    {account?.username}
                  </span>
                </Link>
              </div>
            </div>
            {/* <button
              value={
                account.followers?.includes(currentUser._id)
                  ? "unfollow"
                  : "follow"
              }
              onClick={followUser}
              id={account._id}
              className="followBtn"
            >
              {account.followers?.includes(currentUser._id)
                ? "Unfollow"
                : "Follow"}
            </button> */}
            <button
              value={
                currentUser.following.includes(account._id)
                  ? "unfollow"
                  : "follow"
              }
              onClick={followUser}
              id={account._id}
              className="followBtn"
            >
              {currentUser.following.includes(account._id)
                ? "Unfollow"
                : "Follow"}
            </button>
          </div>
        ))}
      </div>

      <div className="rightBarCopyright">
        <span>Made by ankitdev for learning purposes</span>
      </div>
    </div>
  );
};

export default Rightbar;
