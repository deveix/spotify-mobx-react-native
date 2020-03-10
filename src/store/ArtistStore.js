
import { types, flow } from "mobx-state-tree"
import { SPOTIFY_TOKEN, ARTISTS_LIMIT } from "../common/config";


const Artist = types
.model('Artist', {
    id: types.string,
    name: types.string,
    type: types.string
})


const ArtistStore = types.model('Artists', {
    artists: types.array(Artist)
})
.actions(self => ({
    fetchArtists: flow(function*(playlist_id, offset=self.artists.length) {
        if(offset == 0) self.artists = [];
        try {
            const response = yield fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=${ARTISTS_LIMIT}&offset=${offset}`, {
                method: 'GET', 
                headers: new Headers({
                  'Authorization': 'Bearer '+SPOTIFY_TOKEN, 
                  'Content-Type': 'application/json'
                })
            });
            const result = yield response.json();
            if(result.items && result.items.length > 0){
                let artists = result.items.map((item) => {
                    if(item.track && item.track.artists && item.track.artists.length){
                        let artist = item.track.artists[0]
                        return {
                            id: artist.id,
                            name: artist.name,
                            type: artist.type
                        }
                    }
                    return false;
                });
                let artistsList = [...self.artists, ...artists];
                let uniqueArtists = [];
                artistsList.map((artist) => {
                    if(!uniqueArtists.find((ar) => ar.id == artist.id)) uniqueArtists.push(artist);
                })
                uniqueArtists.sort((a,b) => a.name.localeCompare(b.name));
                self.artists = uniqueArtists;
            }
        } catch (error) {
            alert("Error! Please Add a vaild token.");
            console.log(error);
        }
    }),
    clearArtists: function(){
        self.artists = [];
    }
}))
.create({
    artists: []
});
export default ArtistStore
