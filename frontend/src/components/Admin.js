import React, { useEffect, useState } from 'react';
import ResignationRequest from './ResignationRequest';
import { config } from "../App";
import axios from 'axios';

function Admin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${config.endpoint}/admin/resignations`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });
        setRequests(response.data.data); 
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h2>Pending Resignation Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        requests.map((request) => (
          <ResignationRequest key={request._id} request={request} />
        ))
      )}
    </div>
  );
}

export default Admin;
