import { artistArray } from "../../front-end/src/assets/db/a.js";
import { songsArray } from "../../front-end/src/assets/db/s.js";
import { db } from "./connect.js";

const newArtistArray = artistArray.map(({ id, ...rest }) => rest);
const newSongsArray = songsArray.map(({ id, ...rest }) => rest);

async function resetCollections() {
  console.log("limpando coleções...");
  await db.collection("artists").deleteMany({});
  await db.collection("songs").deleteMany({});

  console.log("inserindo novos dados...");
  const responseSongs = await db.collection("songs").insertMany(newSongsArray);
  const responseArtists = await db.collection("artists").insertMany(newArtistArray);

  console.log("bd atualizado!");
  console.log(responseSongs);
  console.log(responseArtists);
}

resetCollections().then(() => process.exit());