import { useState } from "react";
import "./App.css";
import axios from "axios";

import { Route, Routes, useLocation } from "react-router-dom";

const Authform = ({ onAuthFormSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const location = useLocation();
  // console.log(location);

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(username, password);
    onAuthFormSubmit(username, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>{location.pathname === "/login" ? "Login" : "Register"}</button>
    </form>
  );
};

function App() {
  const login = (username, password) => {
    console.log("Login button clicked", username, password);
  };
  const register = async (username, password) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", {
        username,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Authform onAuthFormSubmit={login} />} />
        <Route
          path="/register"
          element={<Authform onAuthFormSubmit={register} />}
        />
      </Routes>
    </>
  );
}

export default App;
