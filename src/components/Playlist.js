import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function Playlist({ playlist, navigation }) {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Artists", { playlist_id: playlist.id });
      }}
    >
      <View style={styles.playlist}>
        <View style={styles.playlistImageContainer}>
          {playlist.image != "" && (
            <Image
              source={{ uri: playlist.image }}
              style={styles.playlistImage}
            />
          )}
        </View>
        <View style={styles.playlistContent}>
          <Text style={styles.playlistName}>{playlist.name}</Text>
          <Text style={styles.playlistOwnerName}>{playlist.owner_name}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  playlist: {
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row"
  },
  playlistImageContainer: {
    width: 60,
    height: 60
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
  }
});
