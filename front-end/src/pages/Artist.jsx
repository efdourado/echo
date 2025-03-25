import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import SongList from "../components/SongList";
import { artistArray } from "../assets/db/artists";
import { songsArray } from "../assets/db/songs";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Artist = () => {
  const { id } = useParams();
  const { name, banner } = artistArray.filter(
    (currentArtistObj) => currentArtistObj._id === id
  )[0];
  const songsArrayFromArtist = songsArray.filter(
    (currentSongObj) => currentSongObj.artist === name
  );

  return (
    <>
      <Header />
      <div className="artist">
        <div
          className="artist__header"
          style={{
            backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)), url(${banner})`,
          }}
        >
          <div className="artist__info">
            <span className="artist__verified">
              <FontAwesomeIcon icon={faCheckCircle} className="verified-icon" /> Verified Artist
            </span>
            <h2 className="artist__name">{name}</h2>
            <div className="artist__buttons">
              <button className="btn-1">Play</button>
              <button className="btn-2">Follow</button>
            </div>
          </div>
        </div>

        <div className="artist__body">
          <h3>overview</h3>
          <SongList songsArray={songsArrayFromArtist} />
        </div>

        <Footer />

      </div>
    </>
  );
};

export default Artist;
