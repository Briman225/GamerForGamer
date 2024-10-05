import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export default function LoginPage() {
  return (
    <LinearGradient
      colors={["#0D13D3", "#2C96FB"]}
      start={{ x: -1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Gamers 4 Gamers</Text>
          </View>
          <TextInput style={styles.input} placeholder="Username" />
          <TextInput style={styles.input} placeholder="Password" />
          <View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    width: 300,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    paddingLeft: 200
    
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    width: "45%",
    marginLeft: 90,
    marginBottom:300
  },
  buttonText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
});
