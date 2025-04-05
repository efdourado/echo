import React from "react";
import PropTypes from "prop-types";

import Header from "./Header";
import Footer from "./Footer";
import ItemList from "../common/ItemList";
import SongList from "../song/SongList";
import HeroSection from "../sections/hero/HeroSection";

import { artistArray } from "../../assets/db/artists";
import { songsArray } from "../../assets/db/songs";

const MainLayout = ({ type }) => {
  return (
    <>
      <Header />
      <HeroSection
        variant="welcome"
        title="Music Closer than Ever"
        subtitle="A model designed to inspire and support music enthusiasts. Get samples, tips, and organize your ideas effortlessly"
        ctaText="Join Us | Sign Up"
        bgImage="/bg.jpeg"
      />

      <main className="main-layout-content">
        {(type === "songs" || !type) && (
          <ItemList
            title="Popular"
            subtitle="From viral anthems to chart-dominating hits, this is where the top 50 tracks live, breathe, and take over your playlist"
            items={6}
            itemsArray={songsArray}
            path="/songs"
            idPath="/song"
            type="songs"
            showYear
            showPlays
            seeMorePlacement="top"
          />
        )}

        {(!type || type === "albums") && (
          <div className="content-grid">
            <ItemList
              title="Albums"
              items={4}
              itemsArray={songsArray}
              path="/albums"
              idPath="/albums"
              type="albums"
              showYear
              showPlays
              seeMorePlacement="bottom"
            />
            <section className="recent-songs-section">
              <SongList
                title="Recently Played"
                songs={songsArray.slice(0, 5)}
                showCount={false}
                onMenuClick={(songId, target) =>
                  console.log(`menu clicked for song ${songId}`, target)
                }
              />
            </section>
          </div>
        )}

        {(!type || type === "artists") && (
          <ItemList
            title="Artists"
            items={7}
            itemsArray={artistArray}
            path="/artists"
            idPath="/artist"
            type="artists"
            rounded
            seeMorePlacement="top"
          />
        )}
      </main>

      <Footer companyName="Echo" />
    </>
); };

MainLayout.propTypes = {
  type: PropTypes.oneOf(["songs", "artists", "albums"]),
};

export default MainLayout;