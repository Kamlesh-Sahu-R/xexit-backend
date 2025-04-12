import React from 'react';

function ExitUser() {
  const username = localStorage.getItem('username');
  const lwd = localStorage.getItem('lwd');
 

  return (
    <h1>Your Resignation is submitted {username} and your last working day is {lwd}</h1>
  );
}

export default ExitUser;