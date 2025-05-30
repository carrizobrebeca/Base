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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />{" "}
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="/profileuser" element={<ProfileUser />} />
         <Route path="/profileevent" element={<ProfileEvent />} />
        <Route path="/message" element={<Message />} />
 
        
      </Routes>
    </Router>
  );
}

export default App;
