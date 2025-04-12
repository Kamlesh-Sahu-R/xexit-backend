import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import './Register.css';

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
    if (errored || (!response)) {
      alert(
        "Something went wrong. Check that the backend is running, reachable, and returns valid JSON."
      );
      return false;
    }
    if (!response) {
      alert("No response");
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
        await fetch(`${config.endpoint}/auth/register`, {
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
    } catch (e) {
      errored = true;
    }
    setLoading(false);
    if (validateResponse(errored, response)) {
      return response;
    }
  };

  const persistLogin = (message) => {
    localStorage.setItem("message", message);
  };

  const register = async () => {
    if (validateInput()) {
      const response = await performAPICall();

      if (response) {
        persistLogin(
          response.message,
        );
        setUsername("");
        setPassword("");
        alert(response.message);
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex-container">
      <div className="register-container container">
        <h1>Register to XExit Application</h1>

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

        <button className="register-button" onClick={register} disabled={loading}>
          {loading ? "Logging in..." : "Register"}
        </button>
      </div>
    </div>
  );
}

