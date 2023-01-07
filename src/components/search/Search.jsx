import "./search.scss";
import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import {axiosInstance} from "../../config"
import { useEffect } from "react";
import { Link } from "react-router-dom";


const Search = () => {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");

  //SEARCH USERS

  // const handleChange = async (e) => {
  //   try {
  //     const query = e.target.value;
  //     const res = await axios.get("/users/search?q=" + query);
  //     console.log(res.data);
  //   } catch (error) {}
  // };

  useEffect(() => {
    const getUsers = async () => {
      const res = q.length > 2 && (await axiosInstance.get("/users/s/find?q=" + q));
      setUsers(res.data);
    };
    getUsers();
  }, [q]);
  return (
    <div className="search">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          placeholder="Search your friends..."
          onChange={(e) => setQ(e.target.value)}
        />
        <SearchOutlined />
      </div>
      {users && (
        <div className="searchResult">
          {users &&
            users.map((user) => (
              <div key={user._id} className="searchResultItem">
                <img
                  src={user.profilePicture}
                  alt=""
                  className="searchResultImg"
                />
                <div className="searchResultUserInfo">
                  <Link style = {{textDecoration: "none", color: "inherit"}} to={`/profile/${user._id}`}>
                    <span className="username">{user.username}</span>
                  </Link>
                  <Link style = {{textDecoration: "none", color: "inherit"}} to={`/profile/${user._id}`}>
                    <span className="fullname">{user.fullname}</span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
