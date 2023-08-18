import React, { useState, useEffect } from "react";
import { adminDropSkill } from "../../services/adminApi";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../../redux/alertsSlice";

export default function SkillsTable({skillData}) {

  const [Skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [skillIdToDelete, setSkillIdToDelete] = useState(null);

  useEffect(() => {
    setSkills([...skillData]);
  }, [skillData]);

  const dropSkill = (id) => {
    setShowModal(true);
    setSkillIdToDelete(id);
  }

  const confirmDrop = () => {
    if(skillIdToDelete) {
      adminDropSkill({id: skillIdToDelete})
      .then((res) => {
        console.log(res);
        toast.success(res.data.message);
        setSkills((prevData) => 
        prevData.filter((skill) => skill._id !== skillIdToDelete))
      })
      .catch((error) => {
        toast.error(error)
        console.log(error);
      })
      .finally(() => {
        setShowModal(false);
        setSkillIdToDelete(null);
      })
    }
  }

  const closeModal = () => {
    setShowModal(false);
    setSkillIdToDelete(null);
  }
  // const dropSkill = (id) => {
  //   adminDropSkill({id})
  //   .then((res) => {
  //     console.log(res);
  //     toast.success(res.data.message);
  //     setSkills((prevData) => prevData.filter((skill) => skill._id !== id));
  //   })
  //   .catch((error) => {
  //     toast.error(error);
  //     console.log(error);
  //   });
  // };

  return (
    <div className="flex w flex-col">
      <div className="overflow-x-auto ">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden m-2 border shadow-md">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-400 font-medium text-black">
                <tr className="text-lg  ">
                  <th scope="col" className="py-3">
                    NO
                  </th>
                  <th scope="col" className="py-3">
                    SKILL
                  </th>
                  <th scope="col" className="py-3">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {Skills.map((skill, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap font-bold text-lg px-6 py-4">
                      {skill.skill}
                    </td>
                    <td className="whitespace-nowrap font-bold text-lg px-6 py-4">
                      <button
                        type="button"
                        onClick={() => dropSkill(skill._id)}
                        className="bg-red-700 text-white p-2 rounded-md"
                      >
                        DROP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700">
            <div className="bg-white p-6 rounded-md shadow-lg">
              <p>Are you sure you want to drop this skill?</p>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={confirmDrop}
                  className="mr-2 bg-red-700 text-white p-2 rounded-md"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 p-2 rounded-md"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  )
}