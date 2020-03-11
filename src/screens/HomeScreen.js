import React, { Component } from "react";
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
import { observer } from "mobx-react";
import Playlist from "../components/Playlist";

@observer
export default class HomeScreen extends Component {
  async componentDidMount() {
    this.loadData(true);
  }

  async loadData(initial = false) {
    if (initial) {
      await PlaylistStore.fetchPlaylists(0);
    } else {
      await PlaylistStore.fetchPlaylists();
    }
  }

  render() {
    const { playlists, loading } = PlaylistStore;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={item => item.id}
          data={playlists}
          renderItem={({ item }) => (
            <Playlist playlist={item} navigation={this.props.navigation} />
          )}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            this.loadData();
          }}
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
