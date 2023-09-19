import React, { useEffect, useState } from "react";
import { skillData } from "../../../services/EmpApi";

export default function EmpSearchUser({ set }) {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  useEffect(() => {
    skillData()
      .then((res) => {
        setSkills(res.data.skillData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
  };

  const handleSearch = () => {
    // Pass the selected skill to the parent component for search
    set(selectedSkill);
  };

  return (
    <div className="w-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="font-bold font-montserrat text-3xl md:text-5xl lg:text-6xl">
          Discover Top Tech Talent for Your Company
        </h1>
        <form className="mt-8 flex flex-col md:flex-row justify-center items-center">
          <div className="w-full md:w-3/5 mb-4 md:mb-0 md:mr-4">
            <input
              type="text"
              id="skill"
              onChange={handleSkillChange}
              className="bg-white shadow-lg border border-gray-300 text-gray-800 text-lg rounded-lg w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Enter a skill"
            />
          </div>
          <div className="w-full md:w-2/5">
            <button
              type="button"
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg text-white w-full text-lg p-3 mb-4 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
            >
              SEARCH
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
