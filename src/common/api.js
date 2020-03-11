import { PLAYLISTS_LIMIT, ARTISTS_LIMIT, SPOTIFY_TOKEN } from "./config";

export const getFromSpotify = async (endpoint, type) => {
  let limit = type == "playlist" ? PLAYLISTS_LIMIT : ARTISTS_LIMIT;
  const response = await fetch(
    `https://api.spotify.com/v1/${endpoint}&limit=${limit}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + SPOTIFY_TOKEN,
        "Content-Type": "application/json"
      })
    }
  );
  const result = await response.json();
  return result;
};
