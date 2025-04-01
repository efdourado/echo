import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import fallbackImage from '../../assets/images/fb.png';

const SongItem = React.memo(({ 
  artist = "Unknown Artist",
  image, 
  name, 
  duration = 0, 
  _id, 
  isPlaying = false, 
  isCurrent = false,
  progress = 0,
  onPlay,
  onMenuClick
}) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onPlay?.(_id);
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuClick?.(_id, e.currentTarget);
  };

  return (
    <div 
      className={`song-item ${isCurrent ? 'song-item--active' : ''}`}
      aria-current={isCurrent ? "true" : undefined}
    >
        <button 
          className="song-item__play-button"
          onClick={handlePlayClick}
          aria-label={isCurrent && isPlaying ? "Pause" : "Play"}
        >
          {isCurrent && isPlaying ? (
            <FontAwesomeIcon icon={faPause} className="song-item__play-icon" />
          ) : (
            <FontAwesomeIcon icon={faPlay} className="song-item__play-icon"/>
          )}
        </button>

      <Link to={`/song/${_id}`} className="song-item__content" tabIndex="0">
        <div className="song-item__album">
          <img 
            className="song-item__image"
            src={image || fallbackImage}
            alt={`${name} cover`}
            loading="lazy"
            onError={(e) => {
              e.target.src = fallbackImage;
              e.target.onerror = null;
            }}
          />
          <div className="song-item__info">
            <p className="song-item__name">{name}</p>
            <p className="song-item__artist">{artist}</p>
          </div>
        </div>
      </Link>

      <div className="song-item__duration">
        {formatDuration(duration)}
      </div>

      <div 
        className="song-item__progress-container"
        role="progressbar"
        aria-valuenow={isCurrent ? progress : 0}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div 
          className="song-item__progress-bar"
          style={{ width: isCurrent ? `${progress}%` : '0%' }}
        ></div>
      </div>

      <button 
        className="song-item__menu"
        onClick={handleMenuClick}
        aria-label="More options"
        aria-haspopup="true"
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </div>
  );
});

SongItem.propTypes = {
  artist: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number,
  _id: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  isCurrent: PropTypes.bool,
  progress: PropTypes.number,
  onPlay: PropTypes.func,
  onMenuClick: PropTypes.func
};

SongItem.defaultProps = {
  duration: 0,
  isPlaying: false,
  isCurrent: false,
  progress: 0
};

export default SongItem;