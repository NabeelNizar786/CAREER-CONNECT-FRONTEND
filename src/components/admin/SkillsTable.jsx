import React, { useState, useEffect } from "react";

import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading,hideLoading } from "../../redux/alertsSlice";

export default function SkillsTable({skillData}) {

  const [Skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills([...skillData]);
  }, [skillData]);

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
                        className="bg-red-700 text-white p-2 rounded-md"
                      >
                        DROP
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}