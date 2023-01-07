import LeftBar from "../../components/leftbar/LeftBar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="leftBar">
          <LeftBar />
        </div>
        <div className="feed">
          <Feed page = "home"/>
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default Home;
