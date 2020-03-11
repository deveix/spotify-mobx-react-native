import { types, flow } from "mobx-state-tree";
import { getFromSpotify } from "../common/api";

const Playlist = types.model("Playlist", {
  id: types.string,
  name: types.string,
  owner_name: types.string,
  image: types.string
});

const PlaylistStore = types
  .model("Playlists", {
    playlists: types.array(Playlist),
    loading: types.boolean
  })
  .actions(self => ({
    fetchPlaylists: flow(function*(offset = self.playlists.length) {
      self.loading = true;
      try {
        const result = yield getFromSpotify(
          `browse/featured-playlists?offset=${offset}`,
          "playlist"
        );
        if (result.error) {
          alert(`Error! ${result.error.message}`);
        } else {
          if (
            result.playlists &&
            result.playlists.items &&
            result.playlists.items.length > 0
          ) {
            let playlists = result.playlists.items.map(playlist => ({
              id: playlist.id,
              name: playlist.name,
              owner_name: playlist.owner ? playlist.owner.display_name : "",
              image:
                playlist.images && playlist.images.length > 0
                  ? playlist.images[0].url
                  : ""
            }));
            self.playlists.push(...playlists);
          }
        }
      } catch (error) {
        alert(`Error! ${error}`);
        console.log(error);
      }
      self.loading = false;
    })
  }))
  .create({
    playlists: [],
    loading: true
  });
export default PlaylistStore;
