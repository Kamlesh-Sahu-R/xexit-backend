import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import './Login.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const validateInput = () => {
    if (!username) {
      alert("User name is a required field");
      return false;
    }
    if (!password) {
      alert("Password is a required field");
      return false;
    }
    return true;
  };

  const validateResponse = (errored, response) => {
    if (errored || (!response.token)) {
      alert(
        "Something went wrong. Check that the backend is running, reachable, and returns valid JSON."
      );
      return false;
    }
    if (!response.token) {
      alert("No token");
      return false;
    }
    return true;
  };

  const performAPICall = async () => {
    let response = {};
    let errored = false;
    setLoading(true);
    try {
      response = await (
        await fetch(`${config.endpoint}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        })
      ).json();
      console.log(response);
    } catch (e) {
      console.log(e);
      errored = true;
    }
    setLoading(false);
    if (validateResponse(errored, response)) {
      return response;
    }
  };

  const persistLogin = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
  };

  const login = async () => {
    if (validateInput()) {
      const response = await performAPICall();

      if (response) {
        if(username === "admin" && password === "admin"){
          persistLogin(
            response.token,
            username,
          );
          alert(`${username} Login successfully`);
          setUsername("");
          setPassword("");
          navigate("/admin");
        }else{
          persistLogin(
            response.token,
            username,
          );
          alert(`${username} Login successfully`);
          setUsername("");
          setPassword("");
          navigate("/user");
        }
        
      }
    }
  };

  return (
    <div className="flex-container">
      <div className="login-container container">
        <h1>Login to XExit Application</h1>

        <input
          type="text"
          className="input-field"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-button" onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
