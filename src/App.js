import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MobileUpload from "./components/mobileUpload/MobileUpload";
import Edit from "./pages/editProfile/Edit";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import ProfilePostPage from "./pages/profilepost/ProfilePostPage";
import Register from "./pages/register/Register";

import SearchPage from "./pages/searchpage/SearchPage";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={currentUser ? <Home /> : <Login />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/edit/:id" element={<Edit />} />
          <Route exact path="/upload" element={<MobileUpload />} />
          <Route exact path="/posts/:id" element={<ProfilePostPage />} />
          <Route exact path="/search/" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
