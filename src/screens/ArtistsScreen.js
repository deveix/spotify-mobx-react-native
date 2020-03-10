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

import { observer } from 'mobx-react'
import ArtistStore from "../store/ArtistStore";

@observer
class ArtistsScreen extends Component {
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
        const { playlist_id } = this.props.route.params;
        if(initial){
            await ArtistStore.fetchArtists(playlist_id, 0);
        }else{
            await ArtistStore.fetchArtists(playlist_id);
        }
        this.setState({
            loading: false
        })
    }
    componentWillUnmount(){
        ArtistStore.clearArtists();
    }
    renderArtist({ item, index }) {
        return (
            <View style={styles.artist}>
                <Text style={styles.artistName}>{item.name}</Text>
                <Text style={styles.artistType}>{item.type}</Text>
            </View>
        );
    }
    render(){
        const { artists } = ArtistStore;
        return (
            <SafeAreaView style={styles.container}>
              <FlatList
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                onEndReached={() => { if(!this.state.loading) this.loadData() }}
                keyExtractor={(item) => item.id}
                data={artists}
                renderItem={this.renderArtist.bind(this)}
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
    artist: {
        padding: 20,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    artistName: {
        fontSize: 17,
        fontWeight: "bold"
    },
    artistType: {
        fontSize: 15
    },
})

export default ArtistsScreen;