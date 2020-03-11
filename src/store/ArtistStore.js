import { types, flow } from "mobx-state-tree";
import { getFromSpotify } from "../common/api";

const Artist = types.model("Artist", {
  id: types.string,
  name: types.string,
  type: types.string
});

const ArtistStore = types
  .model("Artists", {
    artists: types.array(Artist),
    loading: types.boolean
  })
  .actions(self => ({
    fetchArtists: flow(function*(playlist_id, offset = self.artists.length) {
      if (offset == 0) self.artists = [];
      self.loading = true;
      try {
        const result = yield getFromSpotify(
          `playlists/${playlist_id}/tracks?offset=${offset}`,
          "artist"
        );
        if (result.error) {
          alert(`Error! ${result.error.message}`);
        } else {
          if (result.items && result.items.length > 0) {
            let artists = result.items.map(item => {
              if (
                item.track &&
                item.track.artists &&
                item.track.artists.length
              ) {
                let artist = item.track.artists[0];
                return {
                  id: artist.id,
                  name: artist.name,
                  type: artist.type
                };
              }
              return false;
            });
            self.artists = [...self.artists, ...artists];
          }
        }
      } catch (error) {
        alert(`Error! ${error}`);
        console.log(error);
      }
      self.loading = false;
    }),
    clearArtists: function() {
      self.artists = [];
    }
  }))
  .views(self => ({
    get artistsList() {
      let uniqueArtists = [];
      self.artists.map(artist => {
        if (!uniqueArtists.find(ar => ar.id == artist.id))
          uniqueArtists.push(artist);
      });
      uniqueArtists.sort((a, b) => a.name.localeCompare(b.name));
      return uniqueArtists;
    }
  }))
  .create({
    artists: [],
    loading: true
  });
export default ArtistStore;
