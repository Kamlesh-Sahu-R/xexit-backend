import React, { useState} from 'react';
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import './User.css';

function ResignationForm() {
  const user_name = localStorage.getItem('username');
  const [lwd, setLwd] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateResponse = (errored, response) => {
      if (errored) {
        alert(
          "Something went wrong. Check that the backend is running, reachable, and returns valid JSON."
        );
        return false;
      }
      if (!response) {
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

      const token = localStorage.getItem('token');
      
      response = await (
        await fetch(`${config.endpoint}/user/resign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': token,
          },
          body: JSON.stringify({
            lwd,
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

  const handleChange = (e) => {
    setLwd(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lwd) {
      localStorage.setItem("lwd", lwd);
      const response = await performAPICall();
      if (response) {
        navigate("/exitUser");
      }
    } else {
      alert('Please enter the last working day.');
    }
  };

  return (
    <div className="flex-container">
      <div className="login-container container">
        <div className='welcome'>Welcome Mr. {user_name}</div>
        <div className='resignation'>Resignation Form</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="lwd">Last Working Day:</label>
          <input
            type="date"
            id="lwd"
            name="lwd"
            value={lwd}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {loading ? "Logging in..." : "Resign"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResignationForm;
