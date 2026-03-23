import React, { useState } from 'react';
import './DatePicker.css';

const DatePicker = ({ onRangeChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (endDate && newStartDate) {
      onRangeChange(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && newEndDate) {
      onRangeChange(startDate, newEndDate);
    }
  };

  return (
    <div className="date-picker-container">
      <div className="date-input-group">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
      <div className="date-input-group">
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate}
          max={new Date().toISOString().split('T')[0]}
        />
      </div>
    </div>
  );
};

export default DatePicker;