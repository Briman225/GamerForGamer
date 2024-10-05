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
import Card from '../../components/card';

export default function LoginPage() {
  return (
    <View style={{marginTop:300}}>
       <Card topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Card>
        
      </View>   
)};

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
