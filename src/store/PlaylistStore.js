import { types, flow } from "mobx-state-tree"
import { SPOTIFY_TOKEN, PLAYLISTS_LIMIT } from "../common/config";


const Playlist = types
.model('Playlist', {
    id: types.string,
    name: types.string,
    owner_name: types.string,
    image: types.string
})


const PlaylistStore = types.model('Playlists', {
    playlists: types.array(Playlist)
})
.actions(self => ({
    fetchPlaylists: flow(function*(offset=self.playlists.length) {
        try {
            const response = yield fetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=${PLAYLISTS_LIMIT}&offset=${offset}`, { 
                method: 'GET', 
                headers: new Headers({
                  'Authorization': 'Bearer '+SPOTIFY_TOKEN, 
                  'Content-Type': 'application/json'
                })
            });
            const result = yield response.json();
            if(result.playlists && result.playlists.items && result.playlists.items.length > 0){
                let playlists = result.playlists.items.map((playlist) => ({
                    id: playlist.id,
                    name: playlist.name,
                    owner_name: (playlist.owner?playlist.owner.display_name:""),
                    image: (playlist.images && playlist.images.length > 0)?playlist.images[0].url:""
                }));
                self.playlists.push(...playlists);
            }
        } catch (error) {
            alert("Error! Please Add a vaild token.");
            console.log(error);
        }
    })
}))
.create({
    playlists: []
});
export default PlaylistStore
