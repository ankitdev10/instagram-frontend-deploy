import AccountPage from "../../components/accountpage/AccountPage";
import LeftBar from "../../components/leftbar/LeftBar";

import "./profile.scss";

const Profile = () => {
  return (
    <div className="profile">
      <div className="profileWrapper">
        <div className="leftBar">
          <LeftBar />
        </div>
        <div className="feed">
          <AccountPage />
        </div>
      </div>
    </div>
  );
};

export default Profile;
