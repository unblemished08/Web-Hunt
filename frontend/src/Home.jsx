import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homeimg from "./assets/homeimg2.png";
import techno from "./assets/techno1.png";
import rollno from "./assets/roll.json";
import technp from './assets/techps.png';

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roll: "",
    team: "",
    name: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const score = 0;
    const { roll, team, name } = formData;

    if (roll === "" || team === "" || name === "") {
      alert("Fill all details");
      return;
    }

    if (!rollno.find((item) => item === roll)) {
      alert("Invalid Roll Number");
      return;
    }

    navigate("/page1", { state: { roll, team, name, score } });
  };

  return (
    <div className="bg-black text-slate-50 font-mono min-h-screen">
      <div className="items-center justify-center flex">
        <img src={technp} alt="Techno" className="h-[100px] w-[300px]" /> 
        <p className="text-2xl font-bold m-2 ml-4 text-pink-600">X</p>
        <img src={techno} alt="Techno" className="h-[200px] w-[300px]" />
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center">
        <div className="w-full max-w-md p-6 h-[400px] rounded-lg">
          <h1 className="text-center text-4xl mb-[40px] font-bold">Webhunt</h1>
          <img src={homeimg} alt="Home" />
        </div>
        <div className="w-full max-w-md p-6 rounded-lg">
          <div>
            <h1 className="mb-4 text-2xl font-bold text-center">
              Enter Team Details
            </h1>

            <label className="block mb-2 text-sm font-medium">Team Name</label>
            <input
              type="text"
              name="team"
              value={formData.team}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 hover:border-blue-500 transition"
            />

            <label className="block mb-2 text-sm font-medium">
              Team Leader Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 hover:border-blue-500 transition"
            />

            <label className="block mb-2 text-sm font-medium">
              Team Leader Roll No.
            </label>
            <input
              type="text"
              name="roll"
              value={formData.roll}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200 hover:border-blue-500 transition"
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
  );
}

export default Home;
