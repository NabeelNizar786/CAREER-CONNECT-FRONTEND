import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewDetails({id}) {

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/user/jobDetailedView', {state:{id}})}
      className='bg-blue-900 text-white text-xs md:text-lg md:p-3 p-2 md:px-5 font-bold rounded-md'>
        VIEW MORE
      </button>
    </div>
  )
}