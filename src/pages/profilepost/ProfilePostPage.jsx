import Feed from "../../components/feed/Feed";
import React from "react";
import LeftBar from "../../components/leftbar/LeftBar";
import "./profilepost.scss";
const ProfilePostPage = () => {
  return (
    <div className="profilePost">
      <div className="profilePostWrapper">
        <div className="leftBar">
          <LeftBar />
        </div>
        <div className="feed">
          <Feed page="userposts" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePostPage;
