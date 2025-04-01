import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBackwardStep, 
  faCirclePlay, 
  faForwardStep, 
  faCirclePause 
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const PlayerControls = () => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = useContext(PlayerContext);

  return (
    <div className="player__main-controls">
      <Link 
        to={`/song/${currentTrack.randomIdFromArtist}`} 
        className="player__nav-button"
        onClick={(e) => {
          e.preventDefault();
          playTrack({ 
            ...currentTrack,
            _id: currentTrack.randomIdFromArtist
          });
        }}
      >
        <FontAwesomeIcon icon={faBackwardStep} />
      </Link>

      <button 
        className="player__play-button"
        onClick={togglePlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        <FontAwesomeIcon icon={isPlaying ? faCirclePause : faCirclePlay} />
      </button>

      <Link 
        to={`/song/${currentTrack.randomId2FromArtist}`} 
        className="player__nav-button"
        onClick={(e) => {
          e.preventDefault();
          playTrack({ 
            ...currentTrack,
            _id: currentTrack.randomId2FromArtist
          });
        }}
      >
        <FontAwesomeIcon icon={faForwardStep} />
      </Link>
    </div>
  );
};

export default PlayerControls;