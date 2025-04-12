import React, { useState } from 'react';
import './ResignationRequest.css';
import { useNavigate } from "react-router-dom";
import { config } from "../App";
import axios from 'axios';

function ResignationRequest({ request }) {

  const [status, setStatus] = useState('Pending');
  //const navigate = useNavigate();

  // const handleApproval = () => {
  //   setStatus('Approved');
  //   alert(`Resignation of ${request.user_id} approved! Exit Date set.`);
  //   navigate("/exitUser");
  // };

  // const handleRejection = () => {
  //   setStatus('Rejected');
  //   alert(`Resignation of ${request.user_id} rejected.`);
  //   navigate("/exitUser");
  // };

  const handleRejection = async () => {
    try {
      const url = `${config.endpoint}/admin/conclude_resignation`;
      const token = localStorage.getItem('token');
      const requestData = {
        approved: true,
      };
      const response = await axios.put(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      console.log('Update Result:', response.data.data);
      setStatus('Rejected');
      alert(`Resignation of ${request.user_id} rejected.`);

    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to update resignations.');
    }
  };

  const handleApproval = async () => {
    try {
      const url = `${config.endpoint}/admin/conclude_resignation`;
      const token = localStorage.getItem('token');
      const requestData = {
        resignationId: request._id,
        approved: true,
        lwd: request.lwd,
      };
      const response = await axios.put(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      console.log('Update Result:', response.data.data);
      setStatus('Approved');
      alert(`Resignation of ${request.user_id} approved! Exit Date set.`);

    } catch (error) {
      console.error('Error:', error.message);
      alert('Failed to update resignations.');
    }
  };

  return (
    <div className="request-card">
        <p>Resignation ID: {request._id}</p>
        <h3>User Name: {request.user_id.username}</h3>
        <p>Last working Day: {request.lwd}</p>
        <button onClick={handleApproval} disabled={status !== 'Pending'}>Approve</button>
        <button onClick={handleRejection} disabled={status !== 'Pending'}>Reject</button>
        <p>Status: {status}</p>
    </div>
  );
}

export default ResignationRequest;
