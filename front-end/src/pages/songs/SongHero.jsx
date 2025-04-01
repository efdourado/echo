import React from "react";
import fallbackImage from "../../assets/images/fb.png";
import SongInfoBar from "./SongInfoBar";

const SongHero = ({ song, artist }) => {
  return (
    <div className="song-hero">
      <div className="song-hero__gradient">
        <div className="song-hero__image-container">
          <img
            src={song.image || fallbackImage}
            alt={`${song.name} cover`}
            onError={(e) => {
              e.target.src = fallbackImage;
            }}
          />
        </div>
      </div>
      <SongInfoBar song={song} artist={artist} />
    </div>
  );
};

export default SongHero;