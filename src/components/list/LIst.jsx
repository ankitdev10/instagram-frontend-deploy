import "./list.scss";
import { Close } from "@mui/icons-material";
import { Link } from "react-router-dom";
// identify what is clicked from acountpage component and use axios to get following/followers and use map to display list items

const LIst = ({ list, listType, setShowList, setList }) => {
  // when close is clicked set list to empty array and close list div
  const handleClick = () => {
    setList([]);
    setShowList(false);
  };
  return (
    <div className="listWrapper">
      <h3 className="listTitle">{listType}</h3>
      <hr />
      {list.map((item) => (
        <div key={item._id} className="listItem">
          <div className="itemLeft">
            <img alt = "" src={item.profilePicture} className="profileImg" />
            <div className="userInfo">
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/profile/${item._id}`}
                onClick={handleClick}
              >
                <span className="username">{item.username}</span>
              </Link>
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to={`/profile/${item._id}`}
                onClick={handleClick}
              >
                <span className="fullname">{item.fullname}</span>
              </Link>
            </div>
          </div>
          {listType === "following" && (
            <button className="removeFollower">Remove</button>
          )}
        </div>
      ))}
      <Close onClick={handleClick} className="closeIcon" />
    </div>
  );
};

export default LIst;
