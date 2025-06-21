import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProfileUpdate from "./Components/Views/ProfileUpdate";
import PostEvent from "./Components/Pages/PostEvent";
import PostPost from "./Components/Pages/PostPost";
import AuthWrapper from "./Components/Pages/AuthWrapper";
import Follow from "./Components/Pages/Follow";
import AddUserEvent from "./Components/Pages/AddUserEvent";
import ShowUserEvent from "./Components/Pages/ShowUserEvent";
import Camera from "./Components/Pages/Camera";
import CameraPost from "./Components/Pages/CameraPost";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas: solo si token es válido */}
        <Route element={<AuthWrapper />}>
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/notification" element={<NotificationSm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postevent" element={<PostEvent />} />
          <Route path="/profileuser" element={<ProfileUser />} />
          <Route path="/camera" element={<Camera />} />
          <Route path="/cam" element={<CameraPost />} />
          <Route path="/profileevent" element={<ProfileEvent />} />
          <Route path="/chat/:id" element={<Message />} />
          <Route path="/messagesm" element={<MessageSm />} />
          <Route path="/max" element={<PostMax />} />
          <Route path="/event/:eventId" element={<AddUserEvent />} />
          <Route path="/invitados/:eventId" element={<ShowUserEvent />} />
          {/* <Route path="/chat" element={<Chat />} /> */}
          <Route path="/profileupdate" element={<ProfileUpdate />} />
          <Route path="/post" element={<PostPost />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
