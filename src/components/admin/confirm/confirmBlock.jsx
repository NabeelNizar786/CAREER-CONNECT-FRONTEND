import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../../redux/alertsSlice";
import { toast } from "react-hot-toast";

export default function ConfirmBlock ({user, change, onClose}) {

  const dispatch = useDispatch();

  const handleBlock = () => {
    dispatch(showLoading());
    const newStatus = user.status ? "false" : "true";
    
    change(user._id, newStatus);
    
    setTimeout(() => {
      dispatch(hideLoading());
      onClose(); // Close the confirmation modal
      const action = newStatus === "true" ? "Unblocked" : "Blocked";
      toast.success(`User ${action} successfully`);
    }, 1000); // Change the delay time as per your preference
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-10">
      <div className="bg-white dark:bg-neutral-800 p-6 rounded shadow-md w-96 h-auto">
        <p className="text-lg font-bold">
          Are you sure you want to{" "}
          {user.status ? "block" : "unblock"} this user?
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleBlock}
            className={`px-4 py-2 text-white ${
              user.status
                ? "bg-red-700 hover:bg-red-800"
                : "bg-green-600 hover:bg-green-700"
            } rounded`}
          >
            {user.status ? "Block" : "Unblock"}
          </button>
        </div>
      </div>
    </div>
  );
}