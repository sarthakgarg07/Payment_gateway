import React, { useState } from 'react';
import Homepage from './components/Homepage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', margin: '20px' }}>
        <button onClick={() => setShowAdmin(false)} style={{ padding: '8px 18px', fontWeight: 'bold', background: showAdmin ? '#e0e7ff' : '#3730a3', color: showAdmin ? '#3730a3' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Homepage</button>
        <button onClick={() => setShowAdmin(true)} style={{ padding: '8px 18px', fontWeight: 'bold', background: showAdmin ? '#3730a3' : '#e0e7ff', color: showAdmin ? 'white' : '#3730a3', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Admin Dashboard</button>
      </div>
      {showAdmin ? <AdminDashboard /> : <Homepage />}
    </div>
  );
}

export default App; 