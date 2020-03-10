import React, { Component } from "react"
import {
    SafeAreaView,
    Text,
    View,
    ActivityIndicator,
    StyleSheet,
    Image,
    FlatList,
    TouchableWithoutFeedback
} from "react-native";

import PlaylistStore from "../store/PlaylistStore";
import { observer } from 'mobx-react'

@observer
export default class HomeScreen extends Component {
    state = {
        loading: true
    }
    async componentDidMount(){
        this.loadData(true);
    }
    async loadData(initial=false){
        if(!this.state.loading){
            this.setState({
                loading: true
            })
        }
        if(initial){
            await PlaylistStore.fetchPlaylists(0);
        }else{
            await PlaylistStore.fetchPlaylists();
        }
        this.setState({
            loading: false
        })
    }
    openArtists(playlist){
        this.props.navigation.navigate('Artists', { playlist_id: playlist.id });
    }
    renderPlaylist({ item, index }) {
        return (
            <TouchableWithoutFeedback onPress={() => { this.openArtists(item) }}>
                <View style={styles.playlist}>
                    <View style={styles.playlistImageContainer}>
                        { item.image != "" && 
                            <Image
                                source={{ uri: item.image }}
                                style={styles.playlistImage}
                            />
                        }
                    </View>
                    <View style={styles.playlistContent}>
                        <Text style={styles.playlistName}>{item.name}</Text>
                        <Text style={styles.playlistOwnerName}>{item.owner_name}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    render(){
        const { playlists } = PlaylistStore;
        return (
            <SafeAreaView style={styles.container}>
              <FlatList
              keyExtractor={(item) => item.id}
              data={playlists}
              renderItem={this.renderPlaylist.bind(this)}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              onEndReached={() => { this.loadData() }}
              />
              { this.state.loading &&
                <View style={styles.fullscreen}>
                    <ActivityIndicator style={{ alignSelf: "center" }} size="large" color="#0000ff" />
                </View>
              }
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fullscreen: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playlist: {
        padding: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        flexDirection: "row"
    },
    playlistImageContainer: {
        width: 60,
        height: 60,
    },
    playlistImage: {
        flex: 1,
        borderRadius: 5,
        resizeMode: "contain"
    },
    playlistContent: {
        paddingBottom: 5,
        paddingLeft: 15,
        justifyContent: "center"
    },
    playlistName: {
        fontSize: 17,
        fontWeight: "bold"
    },
    playlistOwnerName: {
        fontSize: 15
    },
})