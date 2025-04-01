import React, { useState } from "react";
import SongItem from "./SongItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const SongList = ({ 
  songsArray = [],
  currentSongId, 
  isPlaying,
  onPlay,
  onMenuClick,
  title = "Songs",
  showCount = true,
  initialVisibleItems = 5,
  incrementStep = 5
}) => {
  if (!songsArray || songsArray.length === 0) {
    return <div className="empty-message">No songs available</div>;
  }
  const [visibleItems, setVisibleItems] = useState(initialVisibleItems);
  const canShowMore = visibleItems < songsArray.length;
  const hasHiddenItems = songsArray.length > initialVisibleItems;

  const toggleShowMore = () => {
    setVisibleItems(prev => 
      prev >= songsArray.length ? initialVisibleItems : prev + incrementStep
  ); };

  return (
    <div className="song-list-container">
      <div className="song-list__header">
        <h2 className="song-list__title">{title}</h2>
        {showCount && (
          <span className="song-list-count">
            {songsArray.length} {songsArray.length === 1 ? 'song' : 'songs'}
          </span>
        )}
      </div>

      <div className="song-list">
        {songsArray.slice(0, visibleItems).map((song) => (
          <SongItem
            {...song}
            key={song._id}
            isCurrent={currentSongId === song._id}
            isPlaying={currentSongId === song._id && isPlaying}
            onPlay={onPlay}
            onMenuClick={onMenuClick}
          />
        ))}
      </div>

      {hasHiddenItems && (
        <button 
          className="show-more-button"
          onClick={toggleShowMore}
        >
          {canShowMore ? (
            <>
              See {Math.min(incrementStep, songsArray.length - visibleItems)} more <FontAwesomeIcon icon={faChevronDown} className="show-more-icon" />
            </>
          ) : (
            <>
              Show less
              <FontAwesomeIcon icon={faChevronUp} className="show-more-icon" />
            </>
          )}
        </button>
      )}
    </div>
); };

export default SongList;