import React from "react";
import { artistArray } from "../assets/db/artists";
import { songsArray } from "../assets/db/songs";
import ItemList from "./ItemList";
import Header from "./Header";
import Footer from "./Footer";
import Showcase from "./ShowCase";

const Main = ({ type }) => {
  return (
    <>
      <Header />
      <Showcase />

      {type === "artists" || type === undefined ? (
        <ItemList title="Artists" items={7} itemsArray={artistArray} path="/artists" idPath="/artist" />
      ) : null}

      {type === "songs" || type === undefined ? (
        <ItemList title="Songs" items={14} itemsArray={songsArray} path="/songs" idPath="/song" />
      ) : null}

      <Footer />

    </>
); };

export default Main;