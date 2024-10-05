import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  topic: string;
  onPress: () => void;
}

const Card: React.FC<ButtonProps> = ({ topic, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          borderRadius: 15,
          height: 350,
          width: "84%",
          justifyContent: "center",
        }}
      >
    <LinearGradient
            colors={["#0D13D3", "#2C96FB"]}
            start={{ x: -1, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{ position: "absolute" }}
          >
        <View>
        <View
          style={{
            marginTop: 260,
            width: "100%",
            height: 100,
            padding: 10,
            borderWidth: 2,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            marginBottom: 10,
            backgroundColor: "white",
            borderColor: "black",
            overflow: "hidden",
          }}
        >
    
            <View style={{}}>
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Nathan Miriki, 21
              </Text>
            </View>

            <View
              style={{
                maxHeight: "60%",
                overflow: "hidden",
              }}
            >
              <Text>Stuff</Text>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderColor: "black",
              }}
            ></View>
        </View>
       </View>
          </LinearGradient>
        </View>
    </TouchableOpacity>
  );
};

export default Card;
