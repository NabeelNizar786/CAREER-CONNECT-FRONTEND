import React, { useEffect, useState } from "react";
import NavBar from "../navBar";
import { userGetCityDetails, userGetSkillsData } from "../../services/userApi";
import Select from "react-select";
import { toast } from "react-hot-toast";

const JobSearch = ({ setSearch, handleSearch }) => {
  const [citys, setCitys] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedOptionCity, setSelectedOptionsCity] = useState();
  const [selectedOptionSkill, setSelectedOptionSkill] = useState();

  function handleSelectCity(data) {
    setSelectedOptionsCity(data)
    setSearch((prevState) => ({
      ...prevState,
      city: data,
    }))
  }

  function handleSelectSkill(data) {
    setSelectedOptionSkill(data)
    setSearch((prevState) => ({
      ...prevState,
      skill: data,
    }))
  }

  useEffect(() => {
    userGetCityDetails()
      .then((res) => {
        setCitys(res.data.cityData);
      })
      .catch((err) => {
        console.log(err);
      });
    userGetSkillsData()
      .then((res) => {
        setSkills(res.data.skillData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-screen">
      <div>
        <h1 className="font-extrabold text-xl md:text-3xl ms-7 md:ms-24 lg:text-5xl mt-14">
          One Search, Millions of Jobs
        </h1>
      </div>
      <form onSubmit={handleSearch}>
        <div className="font-semibold grid-cols-2 flex flex-row flex-wrap items-center m-6 md:ms-24">
          <div className="w-full md:w-2/6 mb-3 md:mb-0 mr-4">
            <Select
              id="city"
              options={citys.map((city) => ({
                value: city.city,
                label: city.city,
              }))}
              onChange={handleSelectCity}
              placeholder="Choose a city"
              isMulti
              styles={{
                // Use the "control" style to adjust the height of the input container
                control: (base, state) => ({
                  ...base,
                  minHeight: '50px', // Adjust the value as needed
                }),
              }}
            />
          </div>
          <div className="w-full md:w-2/6 mb-3 md:mb-0 mr-4">
            <Select
              id="skill"
              options={skills.map((skill) => ({
                value: skill.skill,
                label: skill.skill,
              }))}
              onChange={handleSelectSkill}
              placeholder="Choose a skill"
              isMulti
              styles={{
                // Use the "control" style to adjust the height of the input container
                control: (base, state) => ({
                  ...base,
                  minHeight: '50px', // Adjust the value as needed
                }),
              }}
            />
          </div>
          <div className="w-full md:w-1/6">
            <button
              type="submit"
              className="mb-3 bg-blue-500 text-white w-full text-lg p-2.5 lg:ms-5 font-bold rounded"
            >
              SEARCH
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobSearch;
