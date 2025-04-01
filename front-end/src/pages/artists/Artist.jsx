import React, { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import { artistArray } from "../../assets/db/artists";
import { songsArray } from "../../assets/db/songs";
import fbBanner from "../../assets/images/fb.png";

import SongList from "../../components/song/SongList";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";

const Artist = () => {
  const { id } = useParams();
  const { playTrack } = useContext(PlayerContext);

  const artist = artistArray.find((artist) => artist._id === id);
  if (!artist) {
    return <div>Artist not found</div>;
  }

  const {
    name = "Unknown Artist",
    banner = "",
    description = "",
    monthlyListeners = "0",
    followers = "0",
    albums = [],
    relatedArtists = [],
  } = artist;

  const backgroundImage = banner || fbBanner;

  const songsArrayFromArtist = songsArray.filter(
    (song) => song.artist === name
  );

  return (
    <>
      <Header />
      <div className="artist">
        <div
          className="artist__header"
          style={{ backgroundImage: `url(${banner || fbBanner})` }}
        >
          <div className="artist__header-content">
            <div className="artist__identity">
              <h1 className="artist__name">{name}</h1>
              <span className="artist__verified">
                <FontAwesomeIcon icon={faCheckCircle} /> Verified Artist
              </span>
            </div>

            <div className="artist__stats">
              <div className="stat-item">
                <span className="stat-value">{monthlyListeners}</span>
                <span className="stat-label">Monthly Listeners</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{followers}</span>
                <span className="stat-label">Followers</span>
              </div>
            </div>

            <p className="artist__description">{description}</p>

            <div className="artist__actions">
              <button className="btn btn--primary">
                <FontAwesomeIcon icon={faPlay} /> Play Random
              </button>
              <button className="btn btn--secondary">Follow</button>
            </div>
          </div>
        </div>

        <div className="artist__body">
          <div className="artist__content">
            <div className="artist__main">
              <section className="music-section">
                <div className="section-header">
                  <div className="section-header__title">
                    <h2>Popular</h2>
                    {songsArrayFromArtist.length > 0 && (
                      <span className="section-header__count">
                        {songsArrayFromArtist.length}{" "}
                        {songsArrayFromArtist.length === 1 ? "song" : "songs"}
                      </span>
                    )}
                  </div>
                  {songsArrayFromArtist.length > 5 && (
                    <Link
                      to={`/artist/${id}/songs`}
                      className="btn-text btn-text--icon"
                    >
                      See all
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                      </svg>
                    </Link>
                  )}
                </div>

                <div>
                  <SongList
                    songsArray={songsArrayFromArtist.slice(0, 5)}
                    onPlay={(songId) => {
                      const song = songsArrayFromArtist.find(
                        (s) => s._id === songId
                      );
                      if (song) playTrack(song);
                    }}
                    showCount={false}
                  />
                </div>
              </section>

              {/* Albums Section
  {albums.length > 0 && (
    <section className="albums-section">
      <div className="section-header">
        <div className="section-header__title">
          <h2>Albums</h2>
          <span className="section-header__count">
            {albums.length} {albums.length === 1 ? 'album' : 'albums'}
          </span>
        </div>
        {albums.length > 4 && (
          <button className="btn-text btn-text--icon">
            See all
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
      
      <div className="albums-grid">
        {albums.slice(0, 4).map(album => (
          <AlbumCard 
            key={album.id} 
            {...album} 
            onClick={() => navigate(`/album/${album.id}`)}
          />
        ))}
      </div>
    </section>
  )} */}
            </div>

            <div className="artist__sidebar">
              <section className="stats-section">
                <h3>Artist Stats</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">{monthlyListeners}</span>
                    <span className="stat-label">Monthly Listeners</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{followers}</span>
                    <span className="stat-label">Followers</span>
                  </div>
                </div>
              </section>

              {/* {relatedArtists.length > 0 && ( */}
              <section className="related-section">
                <h3>Fans Also Like</h3>
                <div className="related-artists">
                  {relatedArtists.map((artist) => (
                    <RelatedArtist key={artist.id} {...artist} />
                  ))}
                </div>
              </section>
              {/* )} */}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Artist;
