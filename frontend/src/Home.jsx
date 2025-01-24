import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const [roll, setroll] = useState('');
  const [team, setteam] = useState('');
  const [name, setname] = useState('');

  const handleSubmit = () => {
    const score=0;
    navigate('/page1', { state: { roll, team, name,score} });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800">Enter Team Details</h1>
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Team Name</label>
        <input
          type="text"
          value={team}
          onChange={(e) => setteam(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Team Leader Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Team Leader Roll No.</label>
        <input
          type="text"
          value={roll}
          onChange={(e) => setroll(e.target.value)}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
        
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Home;
