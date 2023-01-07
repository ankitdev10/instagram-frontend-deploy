import { Facebook } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {axiosInstance} from "../../config"
import "./register.scss";

const Register = () => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const [status, setStatus] = useState(true); // initially input fields are not complete
  const navigate = useNavigate();

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // check if user has input all fields

  useEffect(() => {
    if (user.username && user.fullname && user.email && user.password) {
      setStatus(false);
    } else {
      setStatus(true);
    }
  }, [user]);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/auth/register", user);
      navigate("/login");
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerTop">
          <h1 className="logo">Instagram</h1>
          <h5 className="registerInfo">
            Sign up to see photos and videos from your friends
          </h5>
          <button className="loginFb">
            <Facebook className="fbIcon" /> Log in with facebook
          </button>
          <div style={{ textAlign: "center", color: "lightgray" }}>Or</div>
          <form method="POST" action="submit" className="registerForm">
            <input
              onChange={handleInputs}
              required
              type="text"
              placeholder="Full name"
              name="fullname"
            />
            <input
              onChange={handleInputs}
              required
              type="text"
              placeholder="Username"
              name="username"
            />
            <input
              onChange={handleInputs}
              required
              placeholder="Email"
              type="email"
              name="email"
            />
            <input
              onChange={handleInputs}
              required
              type="password"
              placeholder="Password"
              name="password"
            />
            <button
              // style={{ cursor: status && "not-allowed" }}
              type="submit"
              onClick={handleRegister}
              className="signUp"
              disabled={status}
            >
              Sign up
            </button>
          </form>
        </div>
        <div className="registerBottom">
          <span>
            Have an account?{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "rgb(0, 149, 246)",
                fontWeight: "500",
              }}
              to="/login"
            >
              Log in
            </Link>
          </span>
        </div>
        {err && <span className="error">{err}</span>}
      </div>
    </div>
  );
};

export default Register;
