import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Footer from "./Footer";

import Showcase from "../common/Showcase";
import EventsHero from "../hero/EventsHero"

import ItemList from "../common/ItemList";
import { artistArray } from "../../assets/db/artists";
import { songsArray } from "../../assets/db/songs";
import SongList from "../song/SongList";

const MainLayout = ({ type }) => {
  return (
    <>
      <Header />
      <Showcase
        title="Music Closer"
        description="A model designed to inspire and support music enthusiasts. Get samples, tips, and organize your ideas effortlessly"
        ctaText="Join Us | Sign Up"
        bgImage="/sc.jpeg"
      />

      <div className="main-layout-content">
        {type === "songs" || type === undefined ? (
          <ItemList
            title="Popular"
            items={7}
            itemsArray={songsArray}
            path="/songs"
            idPath="/song"
            type="songs"
            showYear={true}
            showPlays={true}
            seeMorePlacement ="top"
          />
        ) : null}

        <div className="content-grid">
          <section className="recent-songs-section">
            <SongList
              title="Recently Played"
              songsArray={songsArray}
              onPlay={(songId) => {
                const song = songsArray.find((s) => s._id === songId);
                if (song) playTrack(song);
              }}
              showCount={false}
            />
          </section>
          {type === "songs" || type === undefined ? (
            <ItemList
              title="Albums"
              items={2}
              itemsArray={songsArray}
              path="/songs"
              idPath="/song"
              type="songs"
              showYear={true}
              showPlays={true}
              seeMorePlacement ="bottom"
            />
        ) : null}
        </div>
        {type === "artists" || type === undefined ? (
            <ItemList
              title="Artists"
              items={7}
              itemsArray={artistArray}
              path="/artists"
              idPath="/artist"
              type="artists"
              rounded={true}
              seeMorePlacement ="top"
            />
          ) : null}
      </div>

      <EventsHero
  title="Próximos Eventos"
  subtitle="Experiências musicais inesquecíveis que vão transformar sua conexão com a arte"
  ctaText="Comprar Ingressos"
  bgImage="/sc_pg.jpeg"
  featuredEvent={{
    day: "24",
    month: "MAI",
    name: "Festival Beats Urbanos",
    location: "São Paulo - SP",
    time: "22:00h",
    artists: ["MC Zaac", "Luísa Sonza", "Djonga", "Tasha & Tracie"]
  }}
/>

      <Footer companyName="Echo" />
    </>
  );
};

MainLayout.propTypes = {
  type: PropTypes.oneOf(["songs", "artists"]),
};

export default MainLayout;