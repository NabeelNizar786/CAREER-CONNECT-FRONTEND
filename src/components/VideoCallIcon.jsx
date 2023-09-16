import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function VideoCallIcon() {

    const navigate = useNavigate();

    const VideoMeet = () => {
        navigate('/meeting');
    }

    return (
        <div className="video-call-icon">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold ml-6
                 py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                onClick={VideoMeet}
            >
                <span className="flex items-center">
                    <FontAwesomeIcon icon={faVideo} className="mr-2" />
                    JOIN MEETING
                </span>
            </button>
        </div>
    );
}

export default VideoCallIcon;
