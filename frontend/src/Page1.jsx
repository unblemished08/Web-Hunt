import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import homeimg2 from "./assets/homeimg2.png";

function Page1() {
  const [flag, setFlag] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { roll, team, name } = location.state || {};
  let { score } = location.state;
  const [ans1, setans1] = useState("");

  const fetchTimeFromAPI = async () => {
    const apiKey = "1S3JEN28WUDZ"; // Replace with your API key
    const url = `http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=zone&zone=Asia/Kolkata`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch time from API");
      }

      const data = await response.json();
      const fullDateTime = data.formatted; // "YYYY-MM-DD HH:mm:ss"
      const time = fullDateTime.split(" ")[1]; // Extracts "HH:mm:ss"
      console.log("Current Time:", time); // Logs time, e.g., "14:35:20"
      return time;
    } catch (error) {
      console.error("Error fetching time from API:", error);
      return null; // Return null if there's an error
    }
  };

  const handleSubmit = async () => {
    if (ans1.toUpperCase() === "AA") {
      try {
        // Fetch current time from TimeZoneDB API
        const currentTime = await fetchTimeFromAPI();
        if (!currentTime) {
          alert("Failed to fetch time. Please try again.");
          return;
        }

        const date = currentTime; // Time from the API
        score = 10;

        alert("Correct Answer!");
        // Data to be sent to the backend
        const data = { roll, team, name, score, date };

        // Sending data to the backend
        const response = await fetch("http://localhost:5000/api/saveData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("Data saved successfully");
          navigate("/page2", { state: { roll, team, name, score, date } });
        } else {
          console.error("Failed to save data");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting. Please try again.");
      }
    } else {
      setFlag(true);
      setAns1("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black">
        {/* Team Details */}
        <div className="w-full max-w-5xl p-6 font-mono rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold text-center text-slate-50 mb-4 border-red-100 border-2 rounded-lg ">
            Team Details
          </h1>
          <div className="flex items-center justify-center pt-[20px]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center  font-stretch-75%">
              <p className="text-slate-50 font-medium">
                Team Name : <span className="font-semibold">{team}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Team Leader Name : <span className="font-semibold">{name}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Team Leader Roll No :{" "}
                <span className="font-semibold">{roll}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center pt-[20px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
              <p className="text-slate-50 font-medium font-stretch-75%">
                Question No. : <span className="font-semibold">{1}</span>
              </p>
              <p className="text-slate-50 font-medium">
                Score : <span className="font-semibold">{score}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Section */}
        <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between bg-black p-6 rounded-lg shadow-md">
          {/* Image on the Left */}
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <img
              src={homeimg2}
              alt="image1"
              className="w-full h-auto rounded-md shadow"
            />
          </div>

          {/* Input and Submit Button on the Right */}
          <div className="flex-grow">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                value={ans1}
                onChange={(e) => setans1(e.target.value)}
                className="w-full px-4 py-2 border text-white font-mono border-violet-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={flag ? "Wrong answer" : "Enter your answer"}
              />
              <button
                onClick={handleSubmit}
                className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 via-pink-500 to-violet-500 rounded-md hover:opacity-90 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page1;
