import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; // Import this
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import TagSelectPage from "./TagSelectPage";
import StartPage from "./index"; // Ensure this is correctly exported in the 'index.js' file

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {" "}
      {/* Wrap your stack navigator with this */}
      <StatusBar barStyle="light-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tags"
          component={TagSelectPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={StartPage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
