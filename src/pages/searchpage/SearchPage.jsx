import LeftBar from "../../components/leftbar/LeftBar";
import Rightbar from "../../components/rightbar/Rightbar";
import Search from "../../components/search/Search";
import "./SearchPage.scss";

const SearchPage = () => {
  return (
    <div className="searchPage">
      <div className="searchWrapper">
        <div className="leftBar">
          <LeftBar />
        </div>
        <div className="searchContainer">
          <Search />
        </div>
        <div className="rightBar">
          <Rightbar />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
