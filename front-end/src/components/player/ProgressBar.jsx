import React, { useContext, useRef, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { formatTime, timeInSeconds } from "../../helpers/time";

const ProgressBar = () => {
  const { currentTrack, audioRef } = useContext(PlayerContext);
  const progressBar = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  
  const durationInSeconds = currentTrack?.duration ? Math.floor(timeInSeconds(currentTrack.duration)) : 0;

  useEffect(() => {
    const updateProgress = () => {
      if (audioRef?.current && progressBar.current) {
        const progress = (audioRef.current.currentTime / durationInSeconds) * 100;
        progressBar.current.style.setProperty('--progress', `${progress}%`);
        setCurrentTime(audioRef.current.currentTime);
    } };

    const intervalId = setInterval(updateProgress, 1000);
    return () => clearInterval(intervalId);
  }, [durationInSeconds, currentTrack]);

  return (
    <div className="player__progress-container">
      <span className="player__time">{formatTime(currentTime)}</span>
      <div 
        ref={progressBar}
        className="player__progress-bar"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pos = (e.clientX - rect.left) / rect.width;
          if (audioRef.current) {
            audioRef.current.currentTime = pos * durationInSeconds;
        } }}
      >
        <div className="player__progress-fill"></div>
      </div>
      <span className="player__time">{currentTrack.duration}</span>
    </div>
); };

export default ProgressBar;