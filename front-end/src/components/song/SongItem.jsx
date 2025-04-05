import React from "react";
import PropTypes from "prop-types";
import { usePlayer } from "../../hooks/usePlayer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import fallbackImage from "../../assets/images/fb.png";
import { formatDuration } from "../../helpers/time";

const SongItem = React.memo(({ song, onMenuClick }) => {
  const player = usePlayer();

  if (!song) return null;

  const isCurrent = player?.currentTrack?._id === song._id;
  const progress =
    isCurrent && player?.duration
      ? (player.currentTime / player.duration) * 100
      : 0;
  const hasAudio = !!song.audio;

  const handlePlayClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!hasAudio) return;

    if (isCurrent) {
      player.togglePlayPause();
    } else {
      player.playTrack(song);
    }
  };

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMenuClick?.(song._id, e.currentTarget);
  };

  return (
    <div
      className={`song-item ${isCurrent ? "song-item--active" : ""} ${
        !hasAudio ? "song-item--disabled" : ""
      }`}
      aria-current={isCurrent ? "true" : undefined}
    >
      <div className="song-item__content">
        <div className="song-item__info-container">
          <button
            className="song-item__play-button"
            onClick={handlePlayClick}
            aria-label={isCurrent && player?.isPlaying ? "Pause" : "Play"}
            disabled={!hasAudio}
          >
            {isCurrent && player?.isPlaying ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>

          <div className="song-item__album">
            <img
              className="song-item__image"
              src={song.image || fallbackImage}
              alt={`${song.name} cover`}
              loading="lazy"
              onError={(e) => {
                e.target.src = fallbackImage;
                e.target.onerror = null;
              }}
            />
            <div className="song-item__info">
              <p className={`song-item__name ${isCurrent ? "text--red" : ""}`}>
                {song.name}
              </p>
              <p className="song-item__plays">{song.plays || 0} plays</p>
            </div>
          </div>
        </div>

        <div className="song-item__meta">
          <p className="song-item__artist">— {song.artist}</p>
          <p className="song-item__duration">
            {formatDuration(song.duration || 0)}
          </p>
        </div>

        {isCurrent && (
          <div
            className="song-item__progress-container"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="song-item__progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        <button
          className="song-item__menu"
          onClick={handleMenuClick}
          aria-haspopup="true"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </div>
      <div className="song-item__divider"></div>
    </div>
); });

SongItem.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    duration: PropTypes.number,
    image: PropTypes.string,
    audio: PropTypes.string,
    plays: PropTypes.number,
  }),
  onMenuClick: PropTypes.func,
};

export default SongItem;