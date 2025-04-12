import React, { useState } from 'react';

function ResignationForm() {
  const [lwd, setLwd] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    setLwd(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (lwd) {
      setSubmittedData({ lwd });
    } else {
      alert('Please enter the last working day.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Resignation Form</h2>
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
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Submitted Data:</h3>
          <p><strong>Last Working Day:</strong> {submittedData.lwd}</p>
        </div>
      )}
    </div>
  );
}

export default ResignationForm;
