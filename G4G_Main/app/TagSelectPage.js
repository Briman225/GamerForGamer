import React, { useState } from "react";
import Tag from '../components/tag';
import { ScrollView } from "react-native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export default function TagSelectPage() {
  return (
    <LinearGradient
      colors={["#0D13D3", "#2C96FB"]}
      start={{ x: -1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Tags</Text>
        <TextInput style={styles.input} placeholder="Search" />
        <View  style={{justifyContent:'space-evenly', flexDirection:'row',
          flexWrap:'wrap', paddingHorizontal:40, gap:3
        }}>
        <Tag topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Tag>
          <Tag topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Tag>
          <Tag topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Tag>
          <Tag topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Tag>
          <Tag topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Tag>
          <Tag topic="League of Legends" onPress={() => 
          {console.log('yippie');
          }}></Tag>

          </View>
          <Link href="../InterestsPage" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </Link>
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
    marginBottom: 500,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFFFFF",
    paddingBottom: 20,
    paddingTop: 150,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 200,
  },
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderColor:'black',
    borderWidth:2,
    padding: 10,
    width:200,
    marginLeft: 0,
    marginTop: 8
  },
  buttonText: {
    fontSize: 18,
    color: "#333333",
    textAlign: "center",
  },
});
