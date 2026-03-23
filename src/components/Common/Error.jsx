import React from 'react';

const Error = ({ message, onRetry }) => {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem',
      color: '#f44336',
      backgroundColor: '#ffebee',
      borderRadius: '8px',
      margin: '1rem'
    }}>
      <h3>Error: {message}</h3>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;