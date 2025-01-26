import React from "react";
import { useLocation } from "react-router-dom";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

function Final() {
  const location = useLocation();
  const { roll, team, name, date, score } = location.state || {};
  const { width, height } = useWindowSize(); // Get the window size for the confetti effect

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black">
      {/* Fireworks Confetti */}
      <Confetti width={width} height={height} />

      {/* Main Content */}
      <div className="w-full max-w-lg p-6 bg-black rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-slate-50 mb-6 underline font-mono">
          CONGRATULATIONS!!
        </h1>
        <h2 className="text-2xl font-bold text-center text-slate-50 mb-6 font-mono">
          Final Results
        </h2>
        <div className="space-y-4 font-mono flex flex-col justify-center items-center">
          <p className="text-slate-50 font-medium">
            Team Name: <span className="font-semibold">{team}</span>
          </p>
          <p className="text-slate-50 font-medium">
            Team Leader Name: <span className="font-semibold">{name}</span>
          </p>
          <p className="text-slate-50 font-medium">
            Team Leader Roll No: <span className="font-semibold">{roll}</span>
          </p>
          <p className="text-slate-50 font-medium">
            Score: <span className="font-semibold">{score}</span>
          </p>
          <p className="text-slate-50 font-medium">
            Last Submission: <span className="font-semibold">{date}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Final;
