import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export default function StartPage() {
  return (
    <LinearGradient
      colors={["#0D13D3", "#2C96FB"]}
      start={{ x: -1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Gamers 4 Gamers</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Link href="../LoginPage" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
        <Link href="../PersonalInfo" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    width: "45%",
  },
  buttonText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
});
