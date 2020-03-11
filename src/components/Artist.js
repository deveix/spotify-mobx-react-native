import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function Artist({ artist }) {
  return (
    <View style={styles.artist}>
      <Text style={styles.artistName}>{artist.name}</Text>
      <Text style={styles.artistType}>{artist.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  artist: {
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  artistName: {
    fontSize: 17,
    fontWeight: "bold"
  },
  artistType: {
    fontSize: 15
  }
});
