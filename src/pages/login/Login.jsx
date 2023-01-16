import "./login.scss";
import Image from "../../images/screenshot1.png";
import Background from "../../images/loginBackground.png";
import { Facebook } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import {  useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess } from "../../redux/userSlice";
import { axiosInstance } from "../../config";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(loginSuccess(res.data));
      }
      navigate("/");
    } catch (error) {
      setErr(error.response.data.message);
    }
    setPassword("");
    setLoading(false)
  };

  // remove error message
  setTimeout(() => {
    setErr("");
  }, 10000);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <img alt = "" src={Background} className="backgroundImg" />
          <img src={Image} className="screenshot" alt="" />
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <h1>Instagram</h1>
            <form action="" className="form">
              <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                required = {true}
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                value={password}
                required = {true}
              />
              <button type="submit" onClick={handleLogin} className="loginBtn">
                {loading ? <ClipLoader color="#36d7b7" /> : "Login"}
              </button>
            </form>
            <span className="or">Or</span>
            <span className="facebook">
              <Facebook className="fbIcon" />
              Login with facebook
            </span>
            {err && <span className="error">{err}</span>}
          </div>
          <div className="loginRegister">
            <span>
              Don't have an account?{" "}
              <Link
                style={{
                  textDecoration: "none",
                  color: "rgb(0, 149, 246)",
                  fontWeight: "500",
                }}
                to="/register"
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
