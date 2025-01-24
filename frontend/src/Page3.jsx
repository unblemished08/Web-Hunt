import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Page3() {
  const location = useLocation();
  const navigate = useNavigate();
  const { roll, team, name, date } = location.state || {};
  let { score } = location.state;
  const [an3, setan3] = useState('');

  const handleSubmit = async() => {
    if (an3.toUpperCase() === 'AA') {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const amPm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12 || 12;
      const date = `${hours}:${minutes}:${seconds} ${amPm}`;
      score = 30;
      // Data to be sent to the backend
      const data = { roll, team, name, score, date };
  
      try {
        // Sending data to the backend using fetch
        const response = await fetch('http://localhost:5000/api/saveData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (response.ok) {
          console.log('Data saved successfully');
          navigate('/page4', { state: { roll, team, name, score, date } });
        } else {
          console.error('Failed to save data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      setan3('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Team Details */}
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Team Details</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <p className="text-gray-700 font-medium">
            Team Name: <span className="font-semibold">{team}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Team Leader Name: <span className="font-semibold">{name}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Team Leader Roll No: <span className="font-semibold">{roll}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Question No. : <span className="font-semibold">{3}</span>
            </p>
          <p className="text-gray-700 font-medium">
            Score: <span className="font-semibold">{score}</span>
          </p>
          <p className="text-gray-700 font-medium">
            Last Submission: <span className="font-semibold">{date}</span>
          </p>
        </div>
      </div>

      {/* Main Section */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between bg-white p-6 rounded-lg shadow-md">
        {/* Image on the Left */}
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <img
            src="/copy.png"
            alt="image1"
            className="w-full h-auto rounded-md shadow"
          />
        </div>

        {/* Input and Submit Button on the Right */}
        <div className="flex-grow">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={an3}
              onChange={(e) => setan3(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your answer"
            />
            <button
              onClick={handleSubmit}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page3;
