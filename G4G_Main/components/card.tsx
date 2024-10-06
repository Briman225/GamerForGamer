import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
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
          borderWidth: 1,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          height: 465,
          width: "80%",
          marginTop: 300,
        }}
      >
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}
          source={require("../assets/images/testImage.png")}
          resizeMode="cover"
        />
      </View>

      <LinearGradient
        colors={["#0D13D3", "#2C96FB"]}
        start={{ x: 0.5, y: 1.8 }} // Start from bottom-center
        end={{ x: 0.5, y: 0 }}
        style={{
          marginTop: -1,
          width: "80%",
          height: 100,
          padding: 8,
          borderWidth: 1,
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          marginBottom: 10,
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
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Card;
