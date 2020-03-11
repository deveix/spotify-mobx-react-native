import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ArtistsScreen from "../screens/ArtistsScreen";

const Stack = createStackNavigator();

export default class RootStack extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Featured Playlists" }}
          />
          <Stack.Screen name="Artists" component={ArtistsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
