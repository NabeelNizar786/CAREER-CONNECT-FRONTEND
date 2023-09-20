import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../../redux/alertsSlice';
import { employerVerify } from '../../services/adminApi';
import { toast } from 'react-hot-toast';


export default function EmpVerifyTable({ empData, verify }) {
  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);

  const toggleModal = (emp) => {
    setSelectedEmp(emp);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="flex flex-col">
      {empData.length === 0 ? (
        <p className="text-center text-4xl mt-8 text-gray-500">
        <span className="block text-6xl">&#128533;</span>
        No employer requests.
      </p>
      ) : (
        <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden m-2 border shadow-md">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-400 font-medium text-blacj dark:border-neutral-500 dark:bg-neutral-900">
                <tr className="text-lg">
                  <th scope="col" className="py-3">
                    NO
                  </th>
                  <th scope="col" className="py-3">
                    Company Name
                  </th>
                  <th scope="col" className="py-3">
                    Email
                  </th>
                  <th scope="col" className="py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {empData.map((emp, index) => (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-bold text-lg">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap font-bold text-lg px-6 py-4">{emp.companyName}</td>
                    <td className="whitespace-nowrap font-bold text-lg px-6 py-4">{emp.email}</td>
                    <td className="whitespace-nowrap font-bold">
                      <button
                        onClick={() =>  {
                          toggleModal(emp); // Pass the employee data to the toggleModal function
                        }}
                        className={`${emp.verified ? 'bg-red-700' : 'bg-green-600'} md:text-lg md:px-3 px-2 md:py-2 text-white rounded-md`}
                      >
                        {emp.verified ? 'Verified' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      )}

      {isModalOpen && selectedEmp && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="modal-overlay absolute inset-0 bg-black opacity-30" onClick={toggleModal}></div>
    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div className="modal-content py-4 text-left px-6">
        <h3 className="text-lg font-bold mb-4">VERIFY</h3>
        <p>Employee Name: {selectedEmp.companyName}</p>
        <p>Email: {selectedEmp.email}</p>
        <button
          onClick={() => {
            verify(selectedEmp.email)
            toggleModal();
            toast.success("EMPLOYER VERIFIED");
          }}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Verify
        </button>
        <button
          onClick={toggleModal}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
