import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Views/Landing";

import Login from "./Components/Views/Login";

import "./App.css";
import Home from "./Components/Views/Home";
import Message from "./Components/Views/Message";
import Explore from "./Components/Views/Explore";
import Profile from "./Components/Views/Profile";
import ProfileUser from "./Components/Views/ProfileUser";
import ProfileEvent from "./Components/Views/ProfileEvent";
import Search from "./Components/Pages/Search";
import NotificationSm from "./Components/Pages/NotificationSm";
import MessageSm from "./Components/Pages/MessageSm";
import PostMax from "./Components/Pages/PostMax";
import Register from "./Components/Views/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/search" element={<Search />} />
        <Route path="/notification" element={<NotificationSm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profileuser" element={<ProfileUser />} />
        <Route path="/profileevent" element={<ProfileEvent />} />
        <Route path="/message" element={<Message />} />
        <Route path="/messagesm" element={<MessageSm />} />
        <Route path="/max" element={<PostMax />} />
      </Routes>
    </Router>
  );
}

export default App;
