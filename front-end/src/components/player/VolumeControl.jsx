import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

const VolumeControl = () => {
  const { audioRef } = useContext(PlayerContext);
  const volumeBar = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, audioRef]);

  const handleVolumeChange = (e) => {
    const rect = volumeBar.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.min(1, Math.max(0, pos));
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="player__volume-controls">
      <button 
        className="player__volume-button"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        <FontAwesomeIcon icon={isMuted ? faVolumeXmark : faVolumeHigh} />
      </button>
      
      <div 
        ref={volumeBar}
        className="player__volume-bar"
        onClick={handleVolumeChange}
        role="slider"
        aria-valuemin="0"
        aria-valuemax="1"
        aria-valuenow={isMuted ? 0 : volume}
        aria-label="Volume control"
      >
        <div 
          className="player__volume-fill"
          style={{ width: `${isMuted ? 0 : volume * 100}%` }}
        ></div>
      </div>
    </div>
); };

export default VolumeControl;