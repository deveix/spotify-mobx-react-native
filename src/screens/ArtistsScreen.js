import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Image,
  FlatList
} from "react-native";

import { observer } from "mobx-react";
import ArtistStore from "../store/ArtistStore";
import Artist from "../components/Artist";

@observer
class ArtistsScreen extends Component {
  async componentDidMount() {
    this.loadData(true);
  }
  async loadData(initial = false) {
    const { playlist_id } = this.props.route.params;
    if (initial) {
      await ArtistStore.fetchArtists(playlist_id, 0);
    } else {
      await ArtistStore.fetchArtists(playlist_id);
    }
  }
  componentWillUnmount() {
    ArtistStore.clearArtists();
  }
  render() {
    const { loading, artistsList } = ArtistStore;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (!loading) this.loadData();
          }}
          keyExtractor={item => item.id}
          data={artistsList}
          renderItem={({ item }) => <Artist artist={item} />}
        />
        {loading && (
          <View style={styles.fullscreen}>
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              size="large"
              color="#0000ff"
            />
          </View>
        )}
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
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ArtistsScreen;
